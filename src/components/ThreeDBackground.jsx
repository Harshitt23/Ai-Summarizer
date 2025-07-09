import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Simple animated cube
function AnimatedCube() {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f46e5" wireframe />
    </mesh>
  )
}

// Main 3D Background Component
export default function ThreeDBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light */}
        <ambientLight intensity={0.6} />
        
        {/* Simple animated cube */}
        <AnimatedCube />
      </Canvas>
    </div>
  )
} 