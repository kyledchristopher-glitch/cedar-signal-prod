import { ReactNode, useEffect, useRef, useState } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const ParallaxLayer = ({ children, className, strength = 16 }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp((rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight, -1, 1);
      setOffset(progress * strength * -1);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
