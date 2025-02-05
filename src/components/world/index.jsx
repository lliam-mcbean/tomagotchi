import { Canvas } from '@react-three/fiber'
import React from 'react'
import Pet from './pet'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useAuth } from '../../context/auth'
import Login from '../login'
import Lights from './lights'

export default function World() {
    const {user, tomagotchi, feedTomagotchi, newTomagotchi} = useAuth()

    console.log(tomagotchi?.user)
  return (
    <div>
    {user ? (
        <div className='w-screen h-screen'>
            <Canvas>
                <Pet />
                <Lights />
                <PerspectiveCamera position={[0,2,10]} makeDefault />
            </Canvas>
            <div className='fixed top-0 left-0 w-screen h-screen flex items-end justify-between p-10'>
                <div></div>
                <div className='uppercase'>{tomagotchi?.status}</div>
                <div className='p-4 bg-gray-100 rounded-lg hover:border hover:border-2 hover:border-blue-500 cursor-pointer' onClick={tomagotchi?.status ===  'dead' ? () => newTomagotchi(user) : () => feedTomagotchi(user)}>{tomagotchi?.status === 'dead' ? 'Adopt A New Pet' : 'Feed Me'}</div>
            </div>
        </div>
    ) : (
        <Login />
    )}
    </div>
  )
}
