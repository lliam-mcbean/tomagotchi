import { useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import { DirectionalLightHelper, PointLightHelper } from 'three'

export default function Lights() {
        const  pointLight = useRef()
        const dirLight  = useRef()
        
        // light helpers
        // useHelper(pointLight, PointLightHelper, 1, "red")
        // useHelper(dirLight, DirectionalLightHelper, 1, "red")
  return (
    <>
        <pointLight ref={pointLight} position={[-1,3,0]} intensity={5} />
        <ambientLight />
        <directionalLight ref={dirLight} position={[3, 6, 6]} intensity={2.5} />
    </>
  )
}
