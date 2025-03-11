import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollDrivenScribblesProps {
  imagePath: string;
}

const ScrollDrivenScribbles = ({ imagePath }: ScrollDrivenScribblesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const calculateScrollProgress = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Element position relative to viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // FOR REVEAL ANIMATION
      let progress;
      if (elementTop > viewportHeight) {
        progress = 0;
      } else if (elementTop + elementHeight < 0) {
        progress = 1;
      } else {
        progress =
          (viewportHeight - elementTop) / (viewportHeight + elementHeight);
      }

      const startPoint = 0.25;
      const endPoint = 1.05;

      let adjustedProgress = 0;
      if (progress >= startPoint) {
        adjustedProgress = Math.min(
          1,
          (progress - startPoint) / (endPoint - startPoint)
        );
      }

      setScrollProgress(adjustedProgress);

      // FOR PARALLAX - apply directly to DOM for guaranteed effect
      // Calculate parallax based on element position in viewport
      const parallaxStrength = 45; // pixels
      const parallaxOffset = -(progress * parallaxStrength);

      // Apply transformation directly to the DOM element
      imageRef.current.style.transform = `translateY(${parallaxOffset}px)`;
    };

    const handleVisibilityChange = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(calculateScrollProgress);
    };

    window.addEventListener("scroll", handleVisibilityChange);
    window.addEventListener("resize", handleVisibilityChange);
    window.addEventListener("orientationchange", handleVisibilityChange);
    window.addEventListener("touchmove", handleVisibilityChange, {
      passive: true,
    });
    window.addEventListener("touchend", handleVisibilityChange, {
      passive: true,
    });

    setTimeout(handleVisibilityChange, 100);

    return () => {
      window.removeEventListener("scroll", handleVisibilityChange);
      window.removeEventListener("resize", handleVisibilityChange);
      window.removeEventListener("orientationchange", handleVisibilityChange);
      window.removeEventListener("touchmove", handleVisibilityChange);
      window.removeEventListener("touchend", handleVisibilityChange);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Calculate clip path size from adjusted progress
  const clipSize = Math.min(150, scrollProgress * 200);

  return (
    <div className="scroll-driven-scribbles rounded-full" ref={containerRef}>
      <div className="relative grid h-[30dvh] sm:h-[38dvh] lg:h-[45dvh] xl:h-[50dvh] w-full sm:w-[82%] md:w-[85%] lg:w-[93%]">
        <div className="relative w-full h-full overflow-hidden rounded-[57px]">
          <div
            className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%]"
            ref={imageRef}
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: `circle(${clipSize}% at 50% 50%)`,
              }}
            >
              <Image
                src={imagePath}
                alt="Profile Image"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDrivenScribbles;
