import React, { Component } from 'react';
import * as THREE from 'three';
import textureSource from './images/texture-flat-subdue.png';

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }
  componentDidMount() {
    function geometryFunc(u, t, optionalTarget) {
      const result = optionalTarget || new THREE.Vector3();

      const v = (t - 0.5) * 768;
      const q = v * 0.05;
      const x = (u - 0.5) * 1024;
      const y = v;
      const z = q * q * q * q;

      return result.set(x, y, z);
    }

    const texture = new THREE.TextureLoader().load(textureSource);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 3);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      1024 / 768,
      0.1,
      2000,
    );

    const geometry = new THREE.ParametricGeometry(geometryFunc, 100, 250);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
    });
    material.map = texture;

    const skybox = new THREE.Mesh(geometry, material);
    scene.add(skybox);

    for (let i = -4; i < 5; i += 1) {
      const light = new THREE.PointLight(0x111111, 8, 300);
      light.position.set(i * 100, 0, 300);
      scene.add(light);
    }

    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);

    camera.position.z = 500;
    camera.position.y = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    renderer.setSize(1024, 768);
    texture.anisotropy = renderer.getMaxAnisotropy();

    let rotation = 0;
    function animate() {
      requestAnimationFrame(animate);
      rotation += 0.01;
      texture.offset.x += 0.007;
      skybox.rotation.y = Math.sin(rotation) * 0.1;
      renderer.render(scene, camera);
    }

    animate();
  }
  render() {
    return (
      <canvas
        className="Background"
        width={720}
        height={480}
        ref={(el) => { this.canvas = el; }}
      />
    );
  }
}
