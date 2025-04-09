"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"

const Stars = (props: any) => {
  const ref = useRef<any>()

  // ✅ Generate sphere positions only once
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000), { radius: 1.2 }),
    []
  )

  useFrame((_, delta) => {
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
          size={0.002}
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
