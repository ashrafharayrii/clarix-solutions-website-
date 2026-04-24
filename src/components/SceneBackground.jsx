import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 150, color = '#2B68E9' }) {
  const mesh = useRef(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function WaveGrid({ color = '#2B68E9' }) {
  const mesh = useRef(null)

  useFrame((state) => {
    if (!mesh.current) return
    const geo = mesh.current.geometry
    const positions = geo.attributes.position.array
    const time = state.clock.elapsedTime
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      positions[i + 2] =
        Math.sin(x * 0.5 + time) * 0.3 +
        Math.sin(y * 0.5 + time * 0.8) * 0.3
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  )
}

export function SceneBackground({ variant = 'combined', color = '#2B68E9', className = '' }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }} className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        {variant === 'particles' && <FloatingParticles color={color} />}
        {variant === 'wave'      && <WaveGrid color={color} />}
        {variant === 'combined'  && (
          <>
            <FloatingParticles count={120} color={color} />
            <WaveGrid color={color} />
          </>
        )}
      </Canvas>
    </div>
  )
}
