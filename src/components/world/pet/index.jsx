import React, { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useAnimations } from '@react-three/drei'
import { useAuth } from '../../../context/auth'

export default function Pet() {
  const { tomagotchi } = useAuth();
  const [userTomagotchi, setUserTomagotchi] = useState(null);

  // Load the models
  const [egg, dragon, dragonEvolved] = useLoader(GLTFLoader, [
    '/models/egg.glb',
    '/models/dragon.gltf',
    '/models/dragon_evolved.gltf',
  ]);

  // Update the model based on tomagotchi evolution
  useEffect(() => {
    if (tomagotchi) {
      switch (tomagotchi.evolution) {
        case 0:
          setUserTomagotchi(egg);
          break;
        case 1:
          setUserTomagotchi(dragon);
          break;
        case 2:
          setUserTomagotchi(dragonEvolved);
          break;
        default:
          setUserTomagotchi(egg); // Fallback to egg
      }
    }
  }, [tomagotchi, egg, dragon, dragonEvolved]);

  // Render the selected model
  return (
    <mesh>
      {userTomagotchi && <primitive object={userTomagotchi.scene} />}
    </mesh>
  );
}
