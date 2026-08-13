import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'

function HeartModel() {
  const meshRef = useRef()
  
  // Create a 2D heart shape
  const shape = useMemo(() => {
    const x = 0, y = 0
    const heartShape = new THREE.Shape()
    heartShape.moveTo(x + 5, y + 5)
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)
    return heartShape
  }, [])

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 20,
    steps: 2,
    bevelSize: 1.5,
    bevelThickness: 1.5
  }

  // Slowly rotate the heart
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      
      // Slight mouse interactivity
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 10 + Math.PI,
        0.05
      )
      meshRef.current.rotation.y += THREE.MathUtils.lerp(
        0,
        (state.pointer.x * Math.PI) / 10,
        0.05
      )
    }
  })

  // The heart shape is drawn upside down initially and off-center, so we fix it with rotation and position
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-0.75, -1.5, -4]} scale={0.15} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        {/* Super premium Shadcn-style glass material */}
        <MeshTransmissionMaterial 
          backside
          backsideThickness={5}
          thickness={2}
          chromaticAberration={0.05}
          anisotropy={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          ior={1.5}
          color="#38bdf8"
          transmission={1}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function Background3D() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-midnight" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 bg-[#020817] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Atmospheric lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#0ea5e9" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#e11d48" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#38bdf8" distance={10} />
        
        {/* Interactive floating particles (Sparkles) */}
        <Sparkles count={400} scale={20} size={1.5} speed={0.3} opacity={0.6} color="#7dd3fc" />
        <Sparkles count={200} scale={15} size={3} speed={0.2} opacity={0.3} color="#f43f5e" noise={1} />

        <HeartModel />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
