"use client"

import type React from "react"

import { forwardRef } from "react"
import Tilt from "react-parallax-tilt"

interface TiltProps {
  children: React.ReactNode
  className?: string
  perspective?: number
  scale?: number
  transitionSpeed?: number
}

const TiltComponent = forwardRef<HTMLDivElement, TiltProps>(
  ({ children, className, perspective = 800, scale = 1.1, transitionSpeed = 400 }, ref) => {
    return (
      <Tilt className={className} perspective={perspective} scale={scale} transitionSpeed={transitionSpeed}>
        <div ref={ref}>{children}</div>
      </Tilt>
    )
  },
)
TiltComponent.displayName = "Tilt"

export { TiltComponent as Tilt }
