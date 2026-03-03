import React, { useEffect, useState } from "react";

import black1 from "../assets/darkAndwhiteBg/Black.png";
import black2 from "../assets/darkAndwhiteBg/black2.png";
import black3 from "../assets/darkAndwhiteBg/black3.png";
import white1 from "../assets/darkAndwhiteBg/white.png";
import white2 from "../assets/darkAndwhiteBg/white2.png";
import white3 from "../assets/darkAndwhiteBg/white3.png";

const DARK_IMAGES = [black1, black2, black3];
const LIGHT_IMAGES = [white1, white2, white3];

export default function RandomBackground({ children }) {
  const [bgImage, setBgImage] = useState(null);

  const pickRandomImage = (theme) => {
    const images = theme === "dark" ? DARK_IMAGES : LIGHT_IMAGES;
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    setBgImage(pickRandomImage(currentTheme));
  }, []);

  // 🔥 Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setBgImage(pickRandomImage(currentTheme));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!bgImage) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.4s ease",
      }}
        className="absolute inset-0 -z-10 pointer-events-none"

    >
      {children}
    </div>
  );
}
