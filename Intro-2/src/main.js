import * as THREE from "three";

//SCENE
const scene = new THREE.Scene();

//TEXTURE
const textureLoader = new THREE.TextureLoader();
const grass = textureLoader.load("/texture.jpg");
grass.colorSpace = THREE.SRGBColorSpace;
grass.minFilter = THREE.NearestFilter

//BOX OBJECT
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: grass });

const box = new THREE.Mesh(geometry, material);

//ADD OBJECT TO SCENE
scene.add(box);

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
  box.rotation.y = elapsedTime;
  box.position.y = Math.sin(elapsedTime);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
