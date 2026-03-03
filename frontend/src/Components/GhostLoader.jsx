import { useEffect, useState } from "react";

export default function SingleGhostLoader() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTick((t) => t + 1);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // animation math
  const speed = 0.05;          // higher = faster
  const bounceHeight = 5;     // px
  const wave = Math.sin(tick * speed);

  const translateY = wave * bounceHeight;
  const opacity = 0.4 + (wave + 1) / 2 * 0.6; // fades in/out

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "3rem",
          transform: `translateY(${-translateY}px)`,
          opacity,
        }}
      >
        👻
      </span>
    </div>
  );
}
