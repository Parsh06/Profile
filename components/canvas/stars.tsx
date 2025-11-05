"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

// Generate random points in sphere without maath dependency
const generateSpherePoints = (count: number, radius: number): Float32Array => {
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    // Generate random point in sphere using rejection sampling
    let x, y, z
    do {
      x = Math.random() * 2 - 1
      y = Math.random() * 2 - 1
      z = Math.random() * 2 - 1
    } while (x * x + y * y + z * z > 1)
    
    // Scale by radius
    positions[i3] = x * radius
    positions[i3 + 1] = y * radius
    positions[i3 + 2] = z * radius
  }
  
  return positions
}

const Stars = (props: any) => {
  const ref = useRef<any>(null)

  // ✅ Generate sphere positions only once
  const sphere = useMemo(
    () => generateSpherePoints(2000, 1.2),
    []
  )

  useFrame((_, delta) => {
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return
    }
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f5d76e"
          size={0.0016}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export const StarsCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  )
}
