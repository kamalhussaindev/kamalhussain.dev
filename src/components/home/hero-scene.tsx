'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Computed once at module level — stable reference, no render-time impurity
const PARTICLE_POSITIONS = (() => {
  const count = 1200
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 1.5 + Math.random() * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
})()

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta
    ref.current.rotation.x = t.current * 0.04
    ref.current.rotation.y = t.current * 0.06
  })

  return (
    <Points ref={ref} positions={PARTICLE_POSITIONS} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7C5CFF"
        size={0.016}
        sizeAttenuation
        opacity={0.5}
        depthWrite={false}
      />
    </Points>
  )
}

function WireframeGlobe() {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta
    ref.current.rotation.x = t.current * 0.07
    ref.current.rotation.y = t.current * 0.1
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.3, 3]} />
      <meshBasicMaterial color="#FF4D2E" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <WireframeGlobe />
      <Particles />
    </Canvas>
  )
}
