import React from 'react'
import { useAuth } from '../../context/auth'

export default function Login() {
    const {signInWithGoogle} = useAuth()
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}
