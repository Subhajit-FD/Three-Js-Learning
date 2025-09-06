import * as THREE from "three";

//SCENE
const scene = new THREE.Scene();

//Texture
const loader = new THREE.TextureLoader();
const colorTexture = loader.load("/textures/door/color.jpg");
const alphaTexture = loader.load("/textures/door/alpha.jpg");
const ambientTexture = loader.load("/textures/door/ambientOcclusion.jpg");
const heightTexture = loader.load("/textures/door/height.jpg");
const metalnessTexture = loader.load("/textures/door/metalness.jpg");
const normalTexture = loader.load("/textures/door/normal.jpg");
const roughnessTexture = loader.load("/textures/door/roughness.jpg");

//Color Correction
colorTexture.colorSpace = THREE.SRGBColorSpace;

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 7, 100);
pointLight.position.set(10, 6, 50);

scene.add(pointLight);

//sphere OBJECT
const geometry = new THREE.SphereGeometry(1, 50, 50);
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshNormalMaterial()
const material = new THREE.MeshStandardMaterial();

//Define Material
material.map = colorTexture;
material.transparent = true;
material.alphaMap = alphaTexture;
// material.wireframe = true;
material.metalness = 0.9;
material.roughness = 0.121;
material.normalMap = normalTexture;
material.aoMap = ambientTexture;
material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(geometry, material);

//ADD OBJECT TO SCENE
scene.add(sphere);

//CAMERA

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

//RESIZING SCREEN
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

//RENDERER
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//ANIMATION

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = elapsedTime * 0.5;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
