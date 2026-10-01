/*
 * Water simulation and rendering shader port for Three.js.
 * Based on the height/velocity ping-pong simulation and Fresnel water shader
 * techniques in WebGL Water by Evan Wallace.
 * https://github.com/evanw/webgl-water
 * Copyright 2011 Evan Wallace. Released under the MIT license.
 * This file is an adaptation; it does not include Evan Wallace's GL.* wrapper.
 */

export const FULLSCREEN_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const CLEAR_FRAGMENT = /* glsl */ `
  void main() {
    gl_FragColor = vec4(0.0);
  }
`;

export const DISTURB_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uCenter;
  uniform float uRadius;
  uniform float uStrength;
  varying vec2 vUv;
  const float PI = 3.141592653589793;
  void main() {
    vec4 info = texture2D(uState, vUv);
    // Evan Wallace water.js addDrop() profile and height-only impulse.
    float drop = max(0.0, 1.0 - length(uCenter * 0.5 + 0.5 - vUv) / uRadius);
    drop = 0.5 - cos(drop * PI) * 0.5;
    info.r += drop * uStrength;
    gl_FragColor = info;
  }
`;

export const REBOUND_IMPULSE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uCenter;
  uniform float uRadius;
  uniform float uFalloff;
  uniform float uImpulse;
  varying vec2 vUv;
  void main() {
    vec4 info = texture2D(uState, vUv);
    float distanceFromCenter = length(uCenter * 0.5 + 0.5 - vUv);
    float profile = exp(-uFalloff * pow(distanceFromCenter / max(uRadius, 0.001), 2.0));
    // A single localized velocity impulse. Subsequent motion belongs to the
    // ordinary heightfield propagation and damping passes.
    info.g += profile * uImpulse;
    gl_FragColor = info;
  }
`;

export const MOVE_SPHERE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec3 uOldCenter;
  uniform vec3 uNewCenter;
  uniform float uRadius;
  uniform float uDisplacementStrength;
  uniform float uVelocityInfluence;
  uniform float uSpeed;
  varying vec2 vUv;

  // Port of Evan Wallace water.js sphereShader.volumeInSphere().
  float volumeInSphere(vec3 center) {
    vec3 toCenter = vec3(vUv.x * 2.0 - 1.0, 0.0, vUv.y * 2.0 - 1.0) - center;
    float t = length(toCenter) / uRadius;
    float dy = exp(-pow(t * 1.5, 6.0));
    float ymin = min(0.0, center.y - dy);
    float ymax = min(max(0.0, center.y + dy), ymin + 2.0 * dy);
    return (ymax - ymin) * 0.1;
  }

  void main() {
    vec4 info = texture2D(uState, vUv);
    // Restore the volume at the old position and displace it at the new one.
    float speedScale = 1.0 + min(uSpeed * uVelocityInfluence, 2.5);
    float displacementScale = uDisplacementStrength * speedScale;
    info.r += volumeInSphere(uOldCenter) * displacementScale;
    info.r -= volumeInSphere(uNewCenter) * displacementScale;
    gl_FragColor = info;
  }
`;

export const UPDATE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform float uWaveSpeed;
  uniform float uEdgeAbsorptionStart;
  uniform float uEdgeAbsorptionStrength;
  uniform float uEdgeAbsorptionPower;
  uniform vec2 uReboundCenter;
  uniform float uReboundRadius;
  uniform float uReboundVelocityDecay;
  uniform float uReboundAge;
  uniform float uReboundDecayWindow;
  varying vec2 vUv;
  void main() {
    vec4 info = texture2D(uState, vUv);
    vec2 dx = vec2(uTexel.x, 0.0);
    vec2 dz = vec2(0.0, uTexel.y);
    // Evan Wallace water.js updateShader(): four-neighbor average, spring
    // coefficient 2.0, per-step velocity attenuation 0.995, then integrate.
    // Scaling the Laplacian by speed^2 changes propagation speed without
    // changing damping or the stone displacement input.
    float average = (
      texture2D(uState, vUv - dx).r +
      texture2D(uState, vUv - dz).r +
      texture2D(uState, vUv + dx).r +
      texture2D(uState, vUv + dz).r
    ) * 0.25;
    info.g += (average - info.r) * 2.0 * uWaveSpeed * uWaveSpeed;
    float reboundDistance = length(vUv - (uReboundCenter * 0.5 + 0.5));
    float reboundLocality = exp(-2.0 * pow(reboundDistance / max(uReboundRadius, 0.001), 2.0));
    float reboundWindow = 1.0 - smoothstep(uReboundDecayWindow * 0.75, uReboundDecayWindow, uReboundAge);
    float velocityDecay = mix(0.995, uReboundVelocityDecay, reboundLocality * reboundWindow);
    info.g *= velocityDecay;
    // Open-boundary sponge layer: fade in only near the render-target edges.
    // No hard height clamp is used, so the wave is absorbed instead of bounced.
    float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float edgeProgress = clamp(1.0 - edgeDistance / uEdgeAbsorptionStart, 0.0, 1.0);
    float absorption = pow(smoothstep(0.0, 1.0, edgeProgress), uEdgeAbsorptionPower);
    info.g *= exp(-uEdgeAbsorptionStrength * absorption);
    info.r += info.g;
    // A softer, weaker height fade avoids visibly clipping the wave at the edge.
    info.r *= exp(-uEdgeAbsorptionStrength * 0.18 * absorption);
    gl_FragColor = info;
  }
`;

// Evan Wallace stores the x/z components of the surface normal in B/A.
export const NORMAL_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  varying vec2 vUv;
  void main() {
    vec4 info = texture2D(uState, vUv);
    // Evan Wallace water.js normalShader(): forward differences and cross(dy, dx).
    vec3 dx = vec3(uTexel.x, texture2D(uState, vec2(vUv.x + uTexel.x, vUv.y)).r - info.r, 0.0);
    vec3 dz = vec3(0.0, texture2D(uState, vec2(vUv.x, vUv.y + uTexel.y)).r - info.r, uTexel.y);
    info.ba = normalize(cross(dz, dx)).xz;
    gl_FragColor = info;
  }
`;

export const WATER_VERTEX = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform float uVerticalScale;
  uniform vec2 uPlaneScale;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  void main() {
    vUv = uv;
    vec4 state = texture2D(uState, uv);
    vec3 displaced = position;
    displaced.y += state.r * uVerticalScale;
    vec3 normal = vec3(state.b, sqrt(max(0.0, 1.0 - dot(state.ba, state.ba))), state.a);
    normal = normalize(vec3(normal.x * uPlaneScale.x / uVerticalScale, normal.y, normal.z * uPlaneScale.y / uVerticalScale));
    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const WATER_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform sampler2D uSceneColor;
  uniform vec2 uResolution;
  uniform vec3 uCameraPosition;
  uniform vec3 uLightDirection;
  uniform float uRefractionStrength;
  uniform float uVerticalScale;
  uniform vec2 uPlaneScale;
  uniform vec2 uImpactPosition;
  uniform float uImpactAge;
  uniform float uWorldWidth;
  uniform float uWaterDepth;
  uniform float uSurfaceOpacity;
  uniform float uSurfaceReveal;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  vec3 skyColor(vec3 ray) {
    float horizon = smoothstep(-0.24, 0.68, ray.y);
    vec3 sky = mix(vec3(0.09, 0.10, 0.12), vec3(0.13, 0.14, 0.16), horizon);
    float sun = pow(max(0.0, dot(normalize(vec3(-0.45, 0.82, 0.35)), ray)), 180.0);
    return sky + vec3(0.72, 0.91, 0.83) * sun;
  }

  vec3 environmentColor(vec3 ray) {
    if (ray.y >= 0.0) return skyColor(ray);
    float depth = clamp(-ray.y, 0.0, 1.0);
    vec3 shallow = vec3(0.494, 0.867, 0.714);
    vec3 mid = vec3(0.373, 0.784, 0.612);
    vec3 deep = vec3(0.243, 0.620, 0.486);
    vec3 deepest = vec3(0.176, 0.373, 0.322);
    vec3 color = mix(shallow, mid, smoothstep(0.0, 0.34, depth));
    color = mix(color, deep, smoothstep(0.30, 0.72, depth));
    return mix(color, deepest, smoothstep(0.68, 1.0, depth));
  }

  void main() {
    // Match renderer.js' five small normal-guided texture walks, which make
    // the displaced surface read more peaked without changing simulation.
    vec2 sampleUv = vUv;
    vec4 info = texture2D(uState, sampleUv);
    for (int i = 0; i < 5; i++) {
      sampleUv = clamp(sampleUv + info.ba * 0.005, vec2(0.002), vec2(0.998));
      info = texture2D(uState, sampleUv);
    }
    vec3 normal = normalize(vec3(
      info.b * uPlaneScale.x / uVerticalScale,
      sqrt(max(0.0, 1.0 - dot(info.ba, info.ba))),
      info.a * uPlaneScale.y / uVerticalScale
    ));
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    if (!gl_FrontFacing) normal = -normal;
    float cosTheta = clamp(dot(normal, viewDirection), 0.0, 1.0);
    const float IOR_WATER = 1.333;
    float f0 = pow((1.0 - IOR_WATER) / (1.0 + IOR_WATER), 2.0);
    // Evan Wallace's above-water Fresnel response, evaluated using the
    // physical water IOR and his cubic grazing-angle ramp.
    float fresnel = mix(0.25, 1.0, pow(1.0 - cosTheta, 3.0));
    fresnel = clamp(fresnel, 0.0, 1.0);

    vec3 incident = -viewDirection;
    vec3 reflectedRay = reflect(incident, normal);
    vec3 refractedRay = refract(incident, normal, 1.0 / IOR_WATER);
    vec3 surfaceMint = vec3(0.659, 0.941, 0.824);
    // Keep the reflection/refraction response, but tint the water-facing side
    // with the same bright mint family as the underwater volume instead of
    // letting the charcoal environment dominate the surface.
    vec3 reflectedColor = mix(environmentColor(reflectedRay), surfaceMint, 0.90);

    vec2 screenUv = gl_FragCoord.xy / uResolution;
    float viewingAngle = 1.0 - cosTheta;
    float refractionAmount = (1.0 - fresnel) * (0.22 + viewingAngle * 0.58);
    vec2 refractionUv = screenUv + refract(-viewDirection, normal, 1.0 / IOR_WATER).xz * uRefractionStrength * refractionAmount;
    refractionUv = clamp(refractionUv, vec2(0.002), vec2(0.998));
    vec3 refractedScene = texture2D(uSceneColor, refractionUv).rgb;
    vec3 refractedColor = mix(refractedScene, refractedScene * vec3(0.80, 0.94, 0.86) + vec3(0.015, 0.045, 0.030), 0.34);
    vec3 refractedEnvironment = environmentColor(refractedRay);
    refractedColor = mix(refractedColor, refractedEnvironment, 0.12);
    refractedColor = mix(refractedColor, surfaceMint, 0.56);

    vec3 color = mix(refractedColor, reflectedColor, fresnel);
    // In the fixed side view, the water plane is seen nearly edge-on. Its
    // normal-based glint can therefore vanish on a calm surface, so retain a
    // restrained grazing-angle mint highlight to keep the waterline legible.
    float viewGrazing = 1.0 - clamp(abs(dot(normal, viewDirection)), 0.0, 1.0);
    float surfaceEdgeHighlight = smoothstep(0.42, 0.92, viewGrazing) * 0.28;
    color = mix(color, vec3(0.843, 1.000, 0.941), surfaceEdgeHighlight);
    float lightAlignment = max(0.0, dot(reflect(-normalize(uLightDirection), normal), viewDirection));
    float specularFringe = pow(lightAlignment, 48.0);
    float specularCore = pow(lightAlignment, 150.0);
    // A tight pale-mint specular core with a restrained, narrower-than-base
    // fringe keeps the existing moving wave crests glossy without changing
    // their simulation or spreading a broad highlight across the surface.
    color += vec3(0.722, 0.953, 0.863) * specularFringe * 0.22;
    color += vec3(0.914, 1.000, 0.965) * specularCore * 0.72;
    float edgeTint = pow(1.0 - cosTheta, 2.0) * 0.055;
    color += vec3(0.659, 0.941, 0.824) * edgeTint;
    vec2 worldXZ = vec2(vWorldPosition.x, vWorldPosition.z);
    float contactDistance = length(worldXZ - uImpactPosition);
    float contactRing = exp(-abs(contactDistance - (0.10 + max(uImpactAge, 0.0) * 0.38)) * 42.0)
      * exp(-max(uImpactAge, 0.0) * 2.6);
    color += vec3(0.843, 1.000, 0.941) * contactRing * step(0.0, uImpactAge) * 0.18;
    float surfaceOpacity = (1.0 - exp(-uSurfaceOpacity * 1.5)) * uSurfaceReveal;
    color = mix(refractedScene, color, surfaceOpacity);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const CURTAIN_VERTEX = /* glsl */ `
  precision highp float;
  uniform sampler2D uState;
  uniform float uVerticalScale;
  attribute vec2 waterUv;
  varying vec2 vUv;
  varying float vWaterDepth;
  varying vec2 vScreenUv;
  void main() {
    vUv = waterUv;
    vec3 displaced = position;
    float surfaceHeight = texture2D(uState, vec2(waterUv.x, 0.999)).r * uVerticalScale;
    if (waterUv.y > 0.5) displaced.y += surfaceHeight;
    vWaterDepth = max(0.0, surfaceHeight - position.y);
    vec4 clipPosition = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    vScreenUv = clipPosition.xy / clipPosition.w * 0.5 + 0.5;
    gl_Position = clipPosition;
  }
`;

export const CURTAIN_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying float vWaterDepth;
  varying vec2 vScreenUv;
  uniform float uAspect;
  void main() {
    float depth = max(vWaterDepth, 0.0);
    float shallowToMid = smoothstep(0.0, 2.0, depth);
    float midToDeep = smoothstep(1.8, 4.0, depth);
    float deepToDeepest = smoothstep(3.8, 6.2, depth);
    vec3 shallow = vec3(0.494, 0.867, 0.714);
    vec3 mid = vec3(0.373, 0.784, 0.612);
    vec3 deep = vec3(0.243, 0.620, 0.486);
    vec3 deepest = vec3(0.176, 0.373, 0.322);
    vec3 waterColor = mix(shallow, mid, shallowToMid);
    waterColor = mix(waterColor, deep, midToDeep);
    waterColor = mix(waterColor, deepest, deepToDeepest);
    // Broad, low-contrast aqua illumination: brighter through the middle,
    // with a soft darker falloff at the edges and toward the bottom.
    vec2 centeredScreen = (vScreenUv - 0.5) * vec2(uAspect, 1.0);
    float radialDistance = length(centeredScreen);
    float centerLight = 1.0 - smoothstep(max(0.12, uAspect * 0.08), max(0.92, uAspect * 0.66), radialDistance);
    float edgeDepth = smoothstep(max(0.12, uAspect * 0.08), max(1.0, uAspect * 0.64), radialDistance);
    float lowerDepth = smoothstep(0.08, 0.98, 1.0 - clamp(vScreenUv.y, 0.0, 1.0));
    waterColor = mix(waterColor, shallow, centerLight * 0.34);
    waterColor = mix(waterColor, deep, edgeDepth * 0.32);
    waterColor = mix(waterColor, deepest, lowerDepth * 0.14);
    float horizontalFade = smoothstep(0.0, 0.06, vUv.x) * (1.0 - smoothstep(0.94, 1.0, vUv.x));
    // Fill the underwater volume strongly just below the surface so the dark
    // page background no longer dominates through the transparent canvas.
    // The stone is redrawn in a separate opaque pass and remains unobscured.
    // Keep the transition directly under the waterline very narrow so the
    // dark page background cannot show through as a thick black seam.
    float depthFade = smoothstep(0.0, 0.006, depth);
    float opacity = depthFade * mix(0.88, 0.97, smoothstep(0.10, 1.2, depth)) * horizontalFade;
    gl_FragColor = vec4(waterColor, opacity);
  }
`;
