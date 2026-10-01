import * as THREE from 'three';
import {
  CLEAR_FRAGMENT, CURTAIN_FRAGMENT, CURTAIN_VERTEX, DISTURB_FRAGMENT,
  FULLSCREEN_VERTEX, MOVE_SPHERE_FRAGMENT, NORMAL_FRAGMENT,
  REBOUND_IMPULSE_FRAGMENT, UPDATE_FRAGMENT, WATER_FRAGMENT, WATER_VERTEX,
} from './side-view-water-shaders.js';

// Reuses the test's simulation shaders with the existing portfolio objects.
const N = 256;
const DEPTH = 4.5;
const VERTICAL_SCALE = DEPTH / 2;
const EDGE_START = 0.14;
const EDGE_STRENGTH = 0.42;
const EDGE_POWER = 2.0;
const WAVE_SPEED = 0.60;
const DROP_RADIUS = 0.095;
const DROP_STRENGTH = -0.11;
const INITIAL_CONTACT_STRENGTH = 0.35;
const STONE_REBOUND_IMPULSE = 0.00009;
const STONE_REBOUND_DECAY = 0.999;
const STONE_REBOUND_RADIUS = DROP_RADIUS * 1.35;
const STONE_REBOUND_FALLOFF = 1.15;
// Locally preserve the single contact rebound impulse a little longer without
// adding force on later frames or changing damping across the rest of the pool.
const REBOUND_DECAY_RADIUS = STONE_REBOUND_RADIUS * 1.25;
const REBOUND_DECAY_WINDOW = 9.0;
const MAX_STONE_INTERACTION_VELOCITY = 4.0;
const STONE_RADIUS = 0.15;
const STONE_DISPLACEMENT = 0.6;
const STONE_VELOCITY_INFLUENCE = 0.30;
const SURFACE_Y = -0.95;
const WATER_SURFACE_OPACITY = 2.0;

export function createPortfolioWater({ renderer, scene, camera, stoneRoot, getStoneHalfHeight }) {
  const targetOptions = {
    format: THREE.RGBAFormat, type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false, stencilBuffer: false,
  };
  const stateA = new THREE.WebGLRenderTarget(N, N, targetOptions);
  const stateB = new THREE.WebGLRenderTarget(N, N, targetOptions);
  stateA.texture.generateMipmaps = stateB.texture.generateMipmaps = false;
  let read = stateA;
  let write = stateB;

  const passScene = new THREE.Scene();
  const passCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial());
  passScene.add(quad);
  const makePass = (fragmentShader, uniforms = {}) => new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX, fragmentShader, uniforms, depthTest: false, depthWrite: false,
  });
  const clearPass = makePass(CLEAR_FRAGMENT);
  const dropPass = makePass(DISTURB_FRAGMENT, {
    uState: { value: null }, uCenter: { value: new THREE.Vector2() },
    uRadius: { value: DROP_RADIUS }, uStrength: { value: DROP_STRENGTH },
  });
  const reboundPass = makePass(REBOUND_IMPULSE_FRAGMENT, {
    uState: { value: null }, uCenter: { value: new THREE.Vector2() },
    uRadius: { value: STONE_REBOUND_RADIUS }, uFalloff: { value: STONE_REBOUND_FALLOFF },
    uImpulse: { value: STONE_REBOUND_IMPULSE },
  });
  const updatePass = makePass(UPDATE_FRAGMENT, {
    uState: { value: null }, uTexel: { value: new THREE.Vector2(1 / N, 1 / N) },
    uWaveSpeed: { value: WAVE_SPEED }, uEdgeAbsorptionStart: { value: EDGE_START },
    uEdgeAbsorptionStrength: { value: EDGE_STRENGTH }, uEdgeAbsorptionPower: { value: EDGE_POWER },
    uReboundCenter: { value: new THREE.Vector2(-10, -10) },
    uReboundRadius: { value: REBOUND_DECAY_RADIUS },
    uReboundVelocityDecay: { value: STONE_REBOUND_DECAY },
    uReboundAge: { value: -1 }, uReboundDecayWindow: { value: REBOUND_DECAY_WINDOW },
  });
  const normalPass = makePass(NORMAL_FRAGMENT, {
    uState: { value: null }, uTexel: { value: new THREE.Vector2(1 / N, 1 / N) },
  });
  const spherePass = makePass(MOVE_SPHERE_FRAGMENT, {
    uState: { value: null }, uOldCenter: { value: new THREE.Vector3() },
    uNewCenter: { value: new THREE.Vector3() }, uRadius: { value: STONE_RADIUS },
    uDisplacementStrength: { value: STONE_DISPLACEMENT },
    uVelocityInfluence: { value: STONE_VELOCITY_INFLUENCE }, uSpeed: { value: 0 },
  });
  const sceneTarget = new THREE.WebGLRenderTarget(1, 1, {
    format: THREE.RGBAFormat, type: THREE.UnsignedByteType,
    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    depthBuffer: true, stencilBuffer: false,
  });
  sceneTarget.texture.colorSpace = THREE.SRGBColorSpace;
  sceneTarget.texture.generateMipmaps = false;

  const currentWidth = () => {
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    return 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.max(camera.aspect, 0.1);
  };
  const width = currentWidth() + 2;
  let widthNow = width;
  const group = new THREE.Group();
  group.position.y = -1.5;
  group.visible = false;
  scene.add(group);

  const positions = new Float32Array(N * N * 3);
  const uvs = new Float32Array(N * N * 2);
  const indices = [];
  for (let z = 0; z < N; z++) for (let x = 0; x < N; x++) {
    const i = z * N + x, u = x / (N - 1), v = z / (N - 1);
    positions.set([-width / 2 + u * width, 0, -DEPTH / 2 + v * DEPTH], i * 3);
    uvs.set([u, v], i * 2);
    if (x < N - 1 && z < N - 1) {
      const a = i, b = a + 1, c = a + N, d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  const planeScale = new THREE.Vector2(width / 2, DEPTH / 2);
  const water = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
    vertexShader: WATER_VERTEX, fragmentShader: WATER_FRAGMENT,
    uniforms: {
      uState: { value: read.texture }, uVerticalScale: { value: VERTICAL_SCALE },
      uPlaneScale: { value: planeScale }, uSceneColor: { value: sceneTarget.texture },
      uResolution: { value: new THREE.Vector2(1, 1) }, uCameraPosition: { value: camera.position },
      uLightDirection: { value: new THREE.Vector3(-4, 7, 10).normalize() },
      uRefractionStrength: { value: 0.035 }, uImpactPosition: { value: new THREE.Vector2() },
      uImpactAge: { value: -1 }, uWorldWidth: { value: width }, uWaterDepth: { value: DEPTH },
      uSurfaceOpacity: { value: WATER_SURFACE_OPACITY },
      uSurfaceReveal: { value: 0 },
    },
    side: THREE.DoubleSide, depthTest: true, depthWrite: true, toneMapped: false,
  }));
  water.renderOrder = 2;
  group.add(water);

  const curtainPositions = new Float32Array(N * 2 * 3);
  const curtainUvs = new Float32Array(N * 2 * 2);
  const curtainIndices = [];
  for (let x = 0; x < N; x++) {
    const u = x / (N - 1), top = x * 2, bottom = top + 1;
    curtainPositions.set([-width / 2 + u * width, 0, DEPTH / 2 + 0.025], top * 3);
    curtainPositions.set([-width / 2 + u * width, -6.2, DEPTH / 2 + 0.025], bottom * 3);
    curtainUvs.set([u, 1], top * 2);
    curtainUvs.set([u, 0], bottom * 2);
    if (x < N - 1) curtainIndices.push(top, bottom, top + 2, top + 2, bottom, bottom + 2);
  }
  const curtainGeometry = new THREE.BufferGeometry();
  curtainGeometry.setAttribute('position', new THREE.BufferAttribute(curtainPositions, 3));
  curtainGeometry.setAttribute('waterUv', new THREE.BufferAttribute(curtainUvs, 2));
  curtainGeometry.setIndex(curtainIndices);
  const curtainMaterial = new THREE.ShaderMaterial({
    vertexShader: CURTAIN_VERTEX, fragmentShader: CURTAIN_FRAGMENT,
    uniforms: {
      uState: { value: read.texture },
      uVerticalScale: { value: VERTICAL_SCALE },
      uAspect: { value: renderer.domElement.width / Math.max(renderer.domElement.height, 1) },
    },
    side: THREE.DoubleSide, transparent: true, depthTest: true, depthWrite: false,
  });
  const curtain = new THREE.Mesh(curtainGeometry, curtainMaterial);
  curtain.renderOrder = 1;
  group.add(curtain);

  const bounds = new THREE.Vector4(-width / 2, -DEPTH / 2, width, DEPTH);
  const stateUniform = { value: read.texture };
  const stoneUniforms = {
    uWaterState: stateUniform, uWaterBounds: { value: bounds },
    uSurfaceY: { value: SURFACE_Y }, uSurfaceScale: { value: VERTICAL_SCALE },
  };
  const stoneMeshes = [];
  stoneRoot.traverse((mesh) => {
    if (!mesh.isMesh || !mesh.material) return;
    stoneMeshes.push(mesh);
    const shade = (source) => {
      const target = source.clone();
      // The source GLB marks the stone double-sided. Render its closed outer
      // surface only and keep the original opaque depth behavior intact.
      target.side = THREE.FrontSide;
      target.transparent = false;
      target.opacity = 1;
      target.depthTest = true;
      target.depthWrite = true;
      target.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, stoneUniforms);
        shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWaterStoneWorldPosition;');
        shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvWaterStoneWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;');
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D uWaterState;\nuniform vec4 uWaterBounds;\nuniform float uSurfaceY;\nuniform float uSurfaceScale;\nvarying vec3 vWaterStoneWorldPosition;');
        const shading = [
          '#include <opaque_fragment>',
          'vec2 waterUv = (vWaterStoneWorldPosition.xz - uWaterBounds.xy) / uWaterBounds.zw;',
          'float insideWater = step(0.0, waterUv.x) * step(waterUv.x, 1.0) * step(0.0, waterUv.y) * step(waterUv.y, 1.0);',
          'vec4 waterInfo = texture2D(uWaterState, clamp(waterUv, vec2(0.001), vec2(0.999)));',
          'float signedDepth = uSurfaceY + waterInfo.r * uSurfaceScale - vWaterStoneWorldPosition.y;',
          'float submerged = smoothstep(-0.035, 0.035, signedDepth) * insideWater;',
          'float depthFog = (1.0 - exp(-max(signedDepth, 0.0) * 0.42)) * submerged;',
          'vec3 dryColor = gl_FragColor.rgb;',
          'float luminance = dot(dryColor, vec3(0.2126, 0.7152, 0.0722));',
          'vec3 reducedSaturation = mix(dryColor, vec3(luminance), 0.08);',
          'float paletteDepth = smoothstep(0.0, 4.5, max(signedDepth, 0.0));',
          'vec3 shallowTint = vec3(0.494, 0.867, 0.714);',
          'vec3 midTint = vec3(0.373, 0.784, 0.612);',
          'vec3 deepTint = vec3(0.243, 0.620, 0.486);',
          'vec3 deepestTint = vec3(0.176, 0.373, 0.322);',
          'vec3 waterTint = mix(shallowTint, midTint, smoothstep(0.0, 0.38, paletteDepth));',
          'waterTint = mix(waterTint, deepTint, smoothstep(0.34, 0.72, paletteDepth));',
          'waterTint = mix(waterTint, deepestTint, smoothstep(0.68, 1.0, paletteDepth));',
          'vec3 depthTint = mix(reducedSaturation, waterTint, 0.24);',
          'gl_FragColor.rgb = mix(dryColor, depthTint, submerged * 0.72);',
          'gl_FragColor.a = 1.0;',
        ].join('\n');
        shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', shading);
      };
      target.customProgramCacheKey = () => 'portfolio-water-underwater-stone-v1';
      target.needsUpdate = true;
      return target;
    };
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(shade) : shade(mesh.material);
  });

  const renderPass = (pass, target) => {
    quad.material = pass;
    renderer.setRenderTarget(target);
    renderer.render(passScene, passCamera);
  };
  const swap = () => { [read, write] = [write, read]; };
  const oldCenter = new THREE.Vector3();
  const currentCenter = new THREE.Vector3();
  let interactionSurfaceY = SURFACE_Y;
  let contactFired = false;
  let initialContactMovePending = false;
  let hasOldCenter = false;
  let previousContactGap = null;
  let elapsed = -1;
  let active = false;

  const publishState = () => {
    water.material.uniforms.uState.value = read.texture;
    curtainMaterial.uniforms.uState.value = read.texture;
    stateUniform.value = read.texture;
  };
  renderPass(clearPass, stateA);
  renderPass(clearPass, stateB);
  renderer.setRenderTarget(null);
  publishState();

  function resize() {
    const w = renderer.domElement.width, h = renderer.domElement.height;
    if (sceneTarget.width !== w || sceneTarget.height !== h) sceneTarget.setSize(w, h);
    water.material.uniforms.uResolution.value.set(w, h);
    curtainMaterial.uniforms.uAspect.value = w / Math.max(h, 1);
    const nextWidth = currentWidth() + 2;
    if (Math.abs(nextWidth - widthNow) > 0.001) {
      widthNow = nextWidth;
      for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
        const i = (iz * N + ix) * 3;
        positions[i] = -widthNow / 2 + (ix / (N - 1)) * widthNow;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();
      for (let ix = 0; ix < N; ix++) {
        const x = -widthNow / 2 + (ix / (N - 1)) * widthNow;
        curtainPositions[ix * 6] = x;
        curtainPositions[ix * 6 + 3] = x;
      }
      curtainGeometry.attributes.position.needsUpdate = true;
      curtainGeometry.computeBoundingSphere();
      bounds.set(-widthNow / 2, -DEPTH / 2, widthNow, DEPTH);
      water.material.uniforms.uPlaneScale.value.set(widthNow / 2, DEPTH / 2);
      water.material.uniforms.uWorldWidth.value = widthNow;
    }
  }
  function applyContact(x, z) {
    const center = new THREE.Vector2(
      THREE.MathUtils.clamp(x / (widthNow / 2), -1, 1),
      THREE.MathUtils.clamp(z / (DEPTH / 2), -1, 1),
    );
    dropPass.uniforms.uState.value = read.texture;
    dropPass.uniforms.uCenter.value.copy(center);
    dropPass.uniforms.uStrength.value = DROP_STRENGTH * INITIAL_CONTACT_STRENGTH;
    renderPass(dropPass, write);
    dropPass.uniforms.uStrength.value = DROP_STRENGTH;
    swap();
    reboundPass.uniforms.uState.value = read.texture;
    reboundPass.uniforms.uCenter.value.copy(center);
    renderPass(reboundPass, write);
    swap();
    updatePass.uniforms.uReboundCenter.value.copy(center);
    updatePass.uniforms.uReboundAge.value = 0;
    contactFired = true;
    initialContactMovePending = true;
    elapsed = 0;
    oldCenter.set(currentCenter.x / (widthNow / 2), (currentCenter.y - interactionSurfaceY) / VERTICAL_SCALE, currentCenter.z / (DEPTH / 2));
    hasOldCenter = true;
    water.material.uniforms.uImpactPosition.value.set(x, z);
    water.material.uniforms.uImpactAge.value = 0;
    publishState();
    window.dispatchEvent(new CustomEvent('portfolio-water-contact'));
  }
  function update(delta, shouldShowWater, surfaceRising, currentSurfaceY = SURFACE_Y, surfaceReveal = 0) {
    active = shouldShowWater;
    group.visible = shouldShowWater;
    group.position.y = currentSurfaceY;
    stoneUniforms.uSurfaceY.value = currentSurfaceY;
    water.material.uniforms.uSurfaceReveal.value = THREE.MathUtils.clamp(surfaceReveal, 0, 1);
    interactionSurfaceY = currentSurfaceY;
    if (!shouldShowWater) return;
    resize();
    if (elapsed >= 0) {
      elapsed += delta;
      water.material.uniforms.uImpactAge.value = elapsed;
      updatePass.uniforms.uReboundAge.value = elapsed;
    }
    stoneRoot.getWorldPosition(currentCenter);
    const contactGap = currentCenter.y - getStoneHalfHeight() - currentSurfaceY;
    if (!contactFired && surfaceRising && contactGap <= 0) {
      applyContact(currentCenter.x, currentCenter.z);
    } else if (
      contactFired
      && previousContactGap !== null
      && ((previousContactGap > 0 && contactGap <= 0) || (previousContactGap < 0 && contactGap >= 0))
    ) {
      // Keep the persistent simulation's first-contact impulse one-shot, while
      // still announcing later surface/stone re-crossings for impact audio.
      window.dispatchEvent(new CustomEvent('portfolio-water-contact'));
    }
    previousContactGap = contactGap;
    if (contactFired && hasOldCenter) {
      const next = new THREE.Vector3(
        THREE.MathUtils.clamp(currentCenter.x / (widthNow / 2), -1, 1),
        (currentCenter.y - currentSurfaceY) / VERTICAL_SCALE,
        THREE.MathUtils.clamp(currentCenter.z / (DEPTH / 2), -1, 1),
      );
      if (next.distanceToSquared(oldCenter) > 1e-10) {
        spherePass.uniforms.uState.value = read.texture;
        spherePass.uniforms.uOldCenter.value.copy(oldCenter);
        spherePass.uniforms.uNewCenter.value.copy(next);
        let speed = oldCenter.distanceTo(next) * VERTICAL_SCALE / Math.max(delta, 1 / 240);
        if (initialContactMovePending) speed = Math.min(speed, MAX_STONE_INTERACTION_VELOCITY);
        spherePass.uniforms.uSpeed.value = speed;
        renderPass(spherePass, write);
        swap();
        oldCenter.copy(next);
        initialContactMovePending = false;
      }
    }
    if (contactFired) {
      for (let i = 0; i < 2; i++) {
        updatePass.uniforms.uState.value = read.texture;
        renderPass(updatePass, write);
        swap();
      }
      normalPass.uniforms.uState.value = read.texture;
      renderPass(normalPass, write);
      swap();
      renderer.setRenderTarget(null);
      publishState();
    }
  }
  function render() {
    if (!active) return renderer.render(scene, camera);
    const waterVisible = water.visible, curtainVisible = curtain.visible;
    water.visible = curtain.visible = false;
    renderer.setRenderTarget(sceneTarget);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    water.visible = waterVisible;
    curtain.visible = curtainVisible;

    // Draw the transparent underwater volume and surface first, then redraw
    // the stone with its original depth behavior so its silhouette stays solid.
    const stoneVisibility = stoneMeshes.map((mesh) => mesh.visible);
    stoneMeshes.forEach((mesh) => { mesh.visible = false; });
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.clear(true, true, true);
    renderer.render(scene, camera);
    stoneMeshes.forEach((mesh, index) => { mesh.visible = stoneVisibility[index]; });
    water.visible = curtain.visible = false;
    renderer.clearDepth();
    renderer.render(scene, camera);
    water.visible = waterVisible;
    curtain.visible = curtainVisible;
    renderer.autoClear = autoClear;
  }
  return { update, render, resize };
}
