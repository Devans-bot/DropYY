import React, { useEffect, useMemo, useState } from "react";

const EMOJIS = ["🦁", "🐮", "🐲", "🐼", "👨🏼‍💻", "📸","🙊"];

const GRID_ROWS = 9;
const GRID_COLS = 7;

export default function EmojiWallpaper() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);

    const observer = new MutationObserver(() => {
      const updated =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(updated);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const emojiGrid = useMemo(() => {
    const grid = [];

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const emoji =
          EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        const size = 28 + Math.random() * 32; // 28px - 60px
        const rotation = Math.random() * 40 - 20;

        const top = (row / GRID_ROWS) * 100 + Math.random() * 6;
        const left = (col / GRID_COLS) * 100 + Math.random() * 6;

        grid.push({
          emoji,
          size,
          rotation,
          top,
          left,
          key: `${row}-${col}-${Math.random()}`
        });
      }
    }

    return grid;
  }, []);

  return (
    <div
      className="absolute w-full h-full rounded-4xl overflow-hidden"
      style={{
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      }}
    >
      {emojiGrid.map((item) => (
        <span
          key={item.key}
          className="
            absolute
            transition-transform
            duration-300
            hover:scale-150
            cursor-default
            select-none
          "
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
