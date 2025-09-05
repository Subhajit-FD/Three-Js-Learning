import * as THREE from "three";

//SCENE
const scene = new THREE.Scene();

//BOX OBJECT
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: "Blue" });

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

//RENDERER
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

//ANIMATION

const tick = () => {
  box.rotation.y += 0.01
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
