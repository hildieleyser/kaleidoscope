import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const NeuralNetworkAnimation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Create neurons (nodes)
    const neurons = [];
    const neuronCount = 100;
    const neuronGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const neuronMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    for (let i = 0; i < neuronCount; i++) {
      const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
      
      // Position randomly in a 3D space
      neuron.position.x = Math.random() * 40 - 20;
      neuron.position.y = Math.random() * 40 - 20;
      neuron.position.z = Math.random() * 40 - 20;
      
      // Store velocity for animation
      neuron.userData.velocity = new THREE.Vector3(
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01
      );
      
      neurons.push(neuron);
      scene.add(neuron);
    }
    
    // Create synapses (connections)
    const synapses = [];
    const connectionDistance = 8;
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.4
    });
    
    function updateConnections() {
      // Remove old connections
      synapses.forEach(synapse => scene.remove(synapse));
      synapses.length = 0;
      
      // Create new connections based on proximity
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const distance = neurons[i].position.distanceTo(neurons[j].position);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              neurons[i].position,
              neurons[j].position
            ]);
            
            const line = new THREE.Line(
              lineGeometry, 
              new THREE.LineBasicMaterial({ 
                color: 0x0088ff,
                transparent: true,
                opacity: opacity * 0.5
              })
            );
            
            synapses.push(line);
            scene.add(line);
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Update neuron positions
      neurons.forEach(neuron => {
        neuron.position.add(neuron.userData.velocity);
        
        // Bounce off invisible boundaries
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(neuron.position[axis]) > 20) {
            neuron.userData.velocity[axis] *= -1;
          }
        });
      });
      
      // Update connections
      updateConnections();
      
      controls.update();
      renderer.render(scene, camera);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      neurons.forEach(neuron => {
        neuron.geometry.dispose();
        neuron.material.dispose();
      });
      
      synapses.forEach(synapse => {
        synapse.geometry.dispose();
        synapse.material.dispose();
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-[70vh] bg-black"
      aria-label="Interactive 3D visualization of a neural network"
    />
  );
};

export default NeuralNetworkAnimation; 