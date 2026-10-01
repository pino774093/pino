import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,J as l,K as u,L as d,M as f,N as p,O as m,P as h,Q as g,R as _,S as ee,T as te,Tt as v,U as y,V as ne,W as b,X as x,Y as S,Z as re,_ as C,a as ie,at as ae,b as oe,ct as w,d as T,dt as se,et as ce,f as le,ft as ue,gt as de,ht as fe,i as pe,it as me,j as he,k as ge,m as _e,mt as ve,n as ye,nt as be,o as E,p as xe,pt as Se,q as Ce,r as we,rt as Te,s as D,st as Ee,tt as De,u as Oe,vt as O,w as ke,x as k,xt as A,yt as j,z as Ae}from"./three.module-CGAVhWGc.js";function M(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}var je=v((()=>{ye()}));function Me(e){let t=new Map,n=new Map,r=e.clone();return N(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function N(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)N(e.children[r],t.children[r],n)}var Ne=v((()=>{}));function Pe(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function P(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}function Fe(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new b({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function F(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function I(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Ie(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Le(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Re(e){let t,n=e.extensions&&e.extensions[z.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+L(n.attributes):e.indices+`:`+L(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+L(e.targets[n]);return t}function L(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function R(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function ze(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}function Be(e,t,n){let r=t.attributes,i=new ie;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new j(t[0],t[1],t[2]),new j(a[0],a[1],a[2])),e.normalized){let t=R(K[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new j,t=new j;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=R(K[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new Se;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Ve(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=X[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return le.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${le.workingColorSpace}" not supported.`),I(e,t),Be(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Ie(e,t.targets,n)})}var He,z,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,B,at,V,H,U,ot,st,ct,lt,W,ut,dt,G,K,q,J,Y,X,Z,ft,Q,pt,mt,ht=v((()=>{ye(),je(),Ne(),He=class extends c{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Ke(e)}),this.register(function(e){return new qe(e)}),this.register(function(e){return new nt(e)}),this.register(function(e){return new rt(e)}),this.register(function(e){return new it(e)}),this.register(function(e){return new Ye(e)}),this.register(function(e){return new Xe(e)}),this.register(function(e){return new Ze(e)}),this.register(function(e){return new Qe(e)}),this.register(function(e){return new Ge(e)}),this.register(function(e){return new $e(e)}),this.register(function(e){return new Je(e)}),this.register(function(e){return new tt(e)}),this.register(function(e){return new et(e)}),this.register(function(e){return new Ue(e)}),this.register(function(e){return new B(e,z.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new B(e,z.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new at(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=d.extractUrlBase(e);a=d.resolveURL(t,this.path)}else a=d.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new _e(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===V){try{a[z.KHR_BINARY_GLTF]=new ot(e)}catch(e){r&&r(e);return}i=JSON.parse(a[z.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new mt(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case z.KHR_MATERIALS_UNLIT:a[t]=new We;break;case z.KHR_DRACO_MESH_COMPRESSION:a[t]=new st(i,this.dracoLoader);break;case z.KHR_TEXTURE_TRANSFORM:a[t]=new ct;break;case z.KHR_MESH_QUANTIZATION:a[t]=new lt;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}},z={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},Ue=class{constructor(e){this.parser=e,this.name=z.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,o=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],s,c=new T(16777215);o.color!==void 0&&c.setRGB(o.color[0],o.color[1],o.color[2],a);let l=o.range===void 0?0:o.range;switch(o.type){case`directional`:s=new xe(c),s.target.position.set(0,0,-1),s.add(s.target);break;case`point`:s=new ce(c),s.distance=l;break;case`spot`:s=new ve(c),s.distance=l,o.spot=o.spot||{},o.spot.innerConeAngle=o.spot.innerConeAngle===void 0?0:o.spot.innerConeAngle,o.spot.outerConeAngle=o.spot.outerConeAngle===void 0?Math.PI/4:o.spot.outerConeAngle,s.angle=o.spot.outerConeAngle,s.penumbra=1-o.spot.innerConeAngle/o.spot.outerConeAngle,s.target.position.set(0,0,-1),s.add(s.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+o.type)}return s.position.set(0,0,0),I(s,o),o.intensity!==void 0&&(s.intensity=o.intensity),s.name=t.createUniqueName(o.name||`light_`+e),r=Promise.resolve(s),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},We=class{constructor(){this.name=z.KHR_MATERIALS_UNLIT}getMaterialType(){return s}extendParams(e,t,n){let r=[];e.color=new T(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],a),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,w))}return Promise.all(r)}},Ge=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Ke=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new O(e,e)}return Promise.all(r)}},qe=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_DISPERSION}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Je=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},Ye=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_SHEEN}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new T(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],a)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,w)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Xe=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},Ze=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_VOLUME}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new T().setRGB(i[0],i[1],i[2],a),Promise.all(r)}},Qe=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_IOR}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},$e=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_SPECULAR}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new T().setRGB(i[0],i[1],i[2],a),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,w)),Promise.all(r)}},et=class{constructor(e){this.parser=e,this.name=z.EXT_MATERIALS_BUMP}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},tt=class{constructor(e){this.parser=e,this.name=z.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return P(this.parser,e,this.name)===null?null:y}extendMaterialParams(e,t){let n=P(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},nt=class{constructor(e){this.parser=e,this.name=z.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},rt=class{constructor(e){this.parser=e,this.name=z.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},it=class{constructor(e){this.parser=e,this.name=z.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},B=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},at=class{constructor(e){this.name=z.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let n=this.parser.json,r=n.nodes[e];if(!r.extensions||!r.extensions[this.name]||r.mesh===void 0)return null;let i=n.meshes[r.mesh];for(let e of i.primitives)if(e.mode!==G.TRIANGLES&&e.mode!==G.TRIANGLE_STRIP&&e.mode!==G.TRIANGLE_FAN&&e.mode!==void 0)return null;let a=r.extensions[this.name].attributes,o=[],s={};for(let e in a)o.push(this.parser.getDependency(`accessor`,a[e]).then(t=>(s[e]=t,s[e])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(e=>{let n=e.pop(),r=n.isGroup?n.children:[n],i=e[0].count,a=[];for(let e of r){let n=new t,r=new j,o=new me,c=new j(1,1,1),l=new ee(e.geometry,e.material,i);for(let e=0;e<i;e++)s.TRANSLATION&&r.fromBufferAttribute(s.TRANSLATION,e),s.ROTATION&&o.fromBufferAttribute(s.ROTATION,e),s.SCALE&&c.fromBufferAttribute(s.SCALE,e),l.setMatrixAt(e,n.compose(r,o,c));let u=null;for(let e in s)if(e===`_COLOR_0`){let t=s[e];l.instanceColor=new k(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(u===null){let e=l.geometry;u=new D,u.name=e.name;for(let t in e.attributes)u.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)u.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&u.setIndex(e.index),u.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)u.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(u.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(u.boundingSphere=e.boundingSphere.clone()),u.drawRange.start=e.drawRange.start,u.drawRange.count=e.drawRange.count,u.userData=Object.assign({},e.userData),l.geometry=u}let t=s[e];u.setAttribute(e,new k(t.array,t.itemSize,t.normalized))}x.prototype.copy.call(l,e),this.parser.assignFinalMaterial(l),a.push(l)}return n.isGroup?(n.clear(),n.add(...a),n):a[0]}))}},V=`glTF`,H=12,U={JSON:1313821514,BIN:5130562},ot=class{constructor(e){this.name=z.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,H),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==V)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-H,i=new DataView(e,H),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===U.JSON){let r=new Uint8Array(e,H+a,t);this.content=n.decode(r)}else if(r===U.BIN){let n=H+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},st=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=z.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,s={},c={},l={};for(let e in o){let t=X[e]||e.toLowerCase();s[t]=o[e]}for(let t in e.attributes){let r=X[t]||t.toLowerCase();if(o[t]!==void 0){let i=n.accessors[e.attributes[t]];l[r]=K[i.componentType].name,c[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=c[t];r!==void 0&&(n.normalized=r)}t(e)},s,l,a,n)})})}},ct=class{constructor(){this.name=z.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},lt=class{constructor(){this.name=z.KHR_MESH_QUANTIZATION}},W=class extends te{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,ee=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+ee*n+h*r+g*c}return i}},ut=new me,dt=class extends W{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return ut.fromArray(i).normalize().toArray(i),i}},G={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},K={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},q={9728:u,9729:f,9984:l,9985:h,9986:Ce,9987:p},J={33071:Oe,33648:o,10497:Ee},Y={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},X={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},Z={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},ft={CUBICSPLINE:void 0,LINEAR:r,STEP:i},Q={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`},pt=new t,mt=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Pe,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new de(this.options.manager):new oe(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _e(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return F(i,a,r),I(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[z.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(d.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,r=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let e=Y[i.type],t=K[i.componentType],n=i.normalized===!0,r=new t(i.count*e);return Promise.resolve(new E(r,e,n))}let a=[];return i.bufferView===void 0?a.push(null):a.push(this.getDependency(`bufferView`,i.bufferView)),i.sparse!==void 0&&(a.push(this.getDependency(`bufferView`,i.sparse.indices.bufferView)),a.push(this.getDependency(`bufferView`,i.sparse.values.bufferView))),Promise.all(a).then(function(e){let a=e[0],o=Y[i.type],s=K[i.componentType],c=s.BYTES_PER_ELEMENT,l=c*o,u=i.byteOffset||0,d=i.bufferView===void 0?void 0:r.bufferViews[i.bufferView].byteStride,f=i.normalized===!0,p,m;if(d&&d!==l){let e=Math.floor(u/d),r=`InterleavedBuffer:`+i.bufferView+`:`+i.componentType+`:`+e+`:`+i.count,l=t.cache.get(r);l||(p=new s(a,e*d,i.count*d/c),l=new n(p,d/c),t.cache.add(r,l)),m=new ke(l,o,u%d/c,f)}else p=a===null?new s(i.count*o):new s(a,u,i.count*o),m=new E(p,o,f);if(i.sparse!==void 0){let t=Y.SCALAR,n=K[i.sparse.indices.componentType],r=i.sparse.indices.byteOffset||0,c=i.sparse.values.byteOffset||0,l=new n(e[1],r,i.sparse.count*t),u=new s(e[2],c,i.sparse.count*o);a!==null&&(m=new E(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(m.setX(t,u[e*o]),o>=2&&m.setY(t,u[e*o+1]),o>=3&&m.setZ(t,u[e*o+2]),o>=4&&m.setW(t,u[e*o+3]),o>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}m.normalized=f}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=q[n.magFilter]||1006,t.minFilter=q[n.minFilter]||1008,t.wrapS=J[n.wrapS]||1e3,t.wrapT=J[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new fe(e);t.needsUpdate=!0,n(t)}),t.load(d.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),I(e,a),e.userData.mimeType=a.mimeType||ze(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[z.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[z.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[z.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new be,_.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new ge,_.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return b}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],o,c={},l=i.extensions||{},u=[];if(l[z.KHR_MATERIALS_UNLIT]){let e=r[z.KHR_MATERIALS_UNLIT];o=e.getMaterialType(),u.push(e.extendParams(c,i,t))}else{let n=i.pbrMetallicRoughness||{};if(c.color=new T(1,1,1),c.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;c.color.setRGB(e[0],e[1],e[2],a),c.opacity=e[3]}n.baseColorTexture!==void 0&&u.push(t.assignTexture(c,`map`,n.baseColorTexture,w)),c.metalness=n.metallicFactor===void 0?1:n.metallicFactor,c.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(c,`metalnessMap`,n.metallicRoughnessTexture)),u.push(t.assignTexture(c,`roughnessMap`,n.metallicRoughnessTexture))),o=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,c)})))}i.doubleSided===!0&&(c.side=2);let d=i.alphaMode||Q.OPAQUE;if(d===Q.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,d===Q.MASK&&(c.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&o!==s&&(u.push(t.assignTexture(c,`normalMap`,i.normalTexture)),c.normalScale=new O(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;c.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&o!==s&&(u.push(t.assignTexture(c,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&o!==s){let e=i.emissiveFactor;c.emissive=new T().setRGB(e[0],e[1],e[2],a)}return i.emissiveTexture!==void 0&&o!==s&&u.push(t.assignTexture(c,`emissiveMap`,i.emissiveTexture,w)),Promise.all(u).then(function(){let n=new o(c);return i.name&&(n.name=i.name),I(n,i),t.associations.set(n,{materials:e}),i.extensions&&F(r,n,i),n})}createUniqueName(e){let t=Te.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[z.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Ve(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Re(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[z.KHR_DRACO_MESH_COMPRESSION]?i(o):Ve(new D,o,t),o.mode===G.TRIANGLE_STRIP?e=e.then(e=>M(e,1)):o.mode===G.TRIANGLE_FAN&&(e=e.then(e=>M(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(t){let n=this,r=this.json,i=this.extensions,a=r.meshes[t],o=a.primitives,s=[];for(let e=0,t=o.length;e<t;e++){let t=o[e].material===void 0?Fe(this.cache):this.getDependency(`material`,o[e].material);s.push(t)}return s.push(n.loadGeometries(o)),Promise.all(s).then(async function(r){let s=r.slice(0,r.length-1),c=r[r.length-1],l=[];for(let r=0,u=c.length;r<u;r++){let u=c[r],d=o[r],f,p=s[r];if(d.mode===G.TRIANGLES||d.mode===G.TRIANGLE_STRIP||d.mode===G.TRIANGLE_FAN||d.mode===void 0){let e=a.isSkinnedMesh===!0,t=u.hasAttribute(`skinIndex`)&&u.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),f=e&&t?new ue(u,p):new ne(u,p),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(d.mode===G.LINES)f=new he(u,p);else if(d.mode===G.LINE_STRIP)f=new m(u,p);else if(d.mode===G.LINE_LOOP)f=new e(u,p);else if(d.mode===G.POINTS)f=new De(u,p);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+d.mode);Object.keys(f.geometry.morphAttributes).length>0&&Le(f,a),f.name=n.createUniqueName(a.name||`mesh_`+t),I(f,a),d.extensions&&F(i,f,d),n.assignFinalMaterial(f),l.push(f)}for(let e=0,r=l.length;e<r;e++)n.associations.set(l[e],{meshes:t,primitives:e});if(l.length===1)return a.extensions&&F(i,l[0],a),l[0];let u=new C;a.extensions&&F(i,u,a),n.associations.set(u,{meshes:t});for(let e=0,t=l.length;e<t;e++)u.add(l[e]);return u})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new g(Ae.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new re(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),I(t,n),Promise.resolve(t)}loadSkin(e){let n=this.json.skins[e],r=[];for(let e=0,t=n.joints.length;e<t;e++)r.push(this._loadNodeShallow(n.joints[e]));return n.inverseBindMatrices===void 0?r.push(null):r.push(this.getDependency(`accessor`,n.inverseBindMatrices)),Promise.all(r).then(function(e){let r=e.pop(),i=e,a=[],o=[];for(let e=0,s=i.length;e<s;e++){let s=i[e];if(s){a.push(s);let n=new t;r!==null&&n.fromArray(r.array,e*16),o.push(n)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,n.joints[e])}return new se(a,o)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new we(i,void 0,l);return I(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,pt)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new j().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let n=this.json,r=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let a=n.nodes[e],o=a.name?i.createUniqueName(a.name):``,s=[],c=i._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return c&&s.push(c),a.camera!==void 0&&s.push(i.getDependency(`camera`,a.camera).then(function(e){return i._getNodeRef(i.cameraCache,a.camera,e)})),i._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){s.push(e)}),this.nodeCache[e]=Promise.all(s).then(function(n){let s;if(s=a.isBone===!0?new pe:n.length>1?new C:n.length===1?n[0]:new x,s!==n[0])for(let e=0,t=n.length;e<t;e++)s.add(n[e]);if(a.name&&(s.userData.name=a.name,s.name=o),I(s,a),a.extensions&&F(r,s,a),a.matrix!==void 0){let e=new t;e.fromArray(a.matrix),s.applyMatrix4(e)}else a.translation!==void 0&&s.position.fromArray(a.translation),a.rotation!==void 0&&s.quaternion.fromArray(a.rotation),a.scale!==void 0&&s.scale.fromArray(a.scale);if(!i.associations.has(s))i.associations.set(s,{});else if(a.mesh!==void 0&&i.meshCache.refs[a.mesh]>1){let e=i.associations.get(s);i.associations.set(s,{...e})}return i.associations.get(s).nodes=e,s}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new C;n.name&&(i.name=r.createUniqueName(n.name)),I(i,n),n.extensions&&F(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Me(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof _||e instanceof fe)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,i,a){let o=[],s=e.name?e.name:e.uuid,c=[];function l(e){e.morphTargetInfluences&&c.push(e.name?e.name:e.uuid)}Z[a.path]===Z.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(s);let u;switch(Z[a.path]){case Z.weights:u=S;break;case Z.rotation:u=ae;break;case Z.translation:case Z.scale:u=A;break;default:switch(n.itemSize){case 1:u=S;break;default:u=A}}let d=i.interpolation===void 0?r:ft[i.interpolation],f=this._getArrayFromAccessor(n);for(let e=0,n=c.length;e<n;e++){let n=new u(c[e]+`.`+Z[a.path],t.array,f,d);i.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),o.push(n)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=R(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof ae?dt:W)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}})),gt,_t,vt,$,yt,bt,xt,St,Ct,wt,Tt,Et=v((()=>{gt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,_t=`
  void main() {
    gl_FragColor = vec4(0.0);
  }
`,vt=`
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
`,$=`
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
`,yt=`
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
`,bt=`
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
`,xt=`
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
`,St=`
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
`,Ct=`
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
`,wt=`
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
`,Tt=`
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
`}));export{gt as a,$ as c,St as d,Et as f,vt as i,bt as l,ht as m,Tt as n,yt as o,He as p,wt as r,xt as s,_t as t,Ct as u};