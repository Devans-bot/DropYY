import React, { useMemo } from "react";

const emojis = ["🦁", "🦄", "🐼", "🐮", "👻"];

export default function EmojiFieldMobile() {
  const items = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => {
      const size = 32 + Math.random() * 60; // small → big
      return {
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        size,
        rotate: -20 + Math.random() * 40,
        scaleMin: 0.8 + Math.random() * 0.2,
        scaleMax: 1.1 + Math.random() * 0.6,
        duration: 3 + Math.random() * 6,
        delay: Math.random() * 5,
      };
    });
  }, []);

  return (
    <div style={styles.page}>
      {items.map(item => (
        <span
          key={item.id}
          style={{
            ...styles.emoji,
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            transform: `rotate(${item.rotate}deg)`,
            animation: `floatScale ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
            "--scaleMin": item.scaleMin,
            "--scaleMax": item.scaleMax,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <style>
        {`
          @keyframes floatScale {
            0% {
              transform: scale(var(--scaleMin)) rotate(var(--rot));
            }
            100% {
              transform: scale(var(--scaleMax)) rotate(var(--rot));
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    width: "100vw",
    maxWidth: "480px",
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#dbe7f5",
    overflow: "hidden",
  },
  emoji: {
    position: "absolute",
    lineHeight: 1,
    userSelect: "none",
    willChange: "transform",
    transformOrigin: "center",
  },
};
