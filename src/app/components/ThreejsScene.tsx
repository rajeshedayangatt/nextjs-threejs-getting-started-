"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A component that renders a simple Three.js scene
 */
const ThreeScene = () => {
  /**
   * A reference to the canvas element that will be used to render the scene
   */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /**
   * A reference to the scene
   */
  const sceneRef = useRef<THREE.Scene | null>(null);
  /**
   * A reference to the WebGL renderer
   */
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  /**
   * A reference to the camera
   */
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  /**
   * An effect that initializes the scene, camera, and renderer on mount
   * and cleans up on unmount
   */
  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas ref is null");
      return;
    }
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Add a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
