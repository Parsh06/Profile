"use client";

import type React from "react";
import { forwardRef } from "react";
import Tilt from "react-parallax-tilt";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  scale?: number;
  transitionSpeed?: number;
}

const TiltComponent = forwardRef<HTMLDivElement, TiltProps>(
  (
    {
      children,
      className = "",
      perspective = 800,
      scale = 1.1,
      transitionSpeed = 400,
    },
    ref
  ) => {
    // Validate props to ensure no invalid values are passed
    if (perspective <= 0 || scale <= 0 || transitionSpeed <= 0) {
      console.error(
        "Invalid props passed to Tilt component. Ensure perspective, scale, and transitionSpeed are positive numbers."
      );
      return null;
    }

    // Ensure children are valid React nodes
    if (!children) {
      console.error("Tilt component requires valid children.");
      return null;
    }

    return (
      <Tilt
        className={className}
        perspective={perspective}
        scale={scale}
        transitionSpeed={transitionSpeed}
        onEnter={() => console.log("Tilt effect started")}
        onLeave={() => console.log("Tilt effect ended")}
      >
        <div ref={ref}>{children}</div>
      </Tilt>
    );
  }
);

TiltComponent.displayName = "Tilt";

export { TiltComponent as Tilt };