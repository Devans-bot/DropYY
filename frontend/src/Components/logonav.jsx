import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SunDarkLightToggle from "./darklighttoggle";
import Logout from "./logout";

const emojis = ["🥷🏻", "🦁", "👻", "🐮", "🙊", "😽"];

const DropYY = () => {
  const emojiRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = emojiRef.current;

    gsap.set(el, {
      y: -40,
      autoAlpha: 0,
    });

    const tl = gsap.timeline({ repeat: -1 });

    tl
      // ENTER from top
      .to(el, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "bounce.out",
      })

      // HOLD
      .to({}, { duration: 1 })

      // EXIT down
      .to(el, {
        y: 40,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // 🔒 CHANGE EMOJI ONLY WHEN HIDDEN
          indexRef.current = (indexRef.current + 1) % emojis.length;
          el.textContent = emojis[indexRef.current];

          // reset position for next entry
          gsap.set(el, { y: -40 });
        },
      });

    return () => tl.kill();
  }, []);

  return (
    <div className="absolute z-50 top-0 w-full h-10 md:h-14 rounded-2xl
                    flex items-center justify-center backdrop-blur-md bg-primary/50 shadow-lg
                   border-2 border-white/10
                   overflow-hidden">

      <div className="flex items-center justify-center  gap-3">

        <div className="relative  h-10 w-10 overflow-hidden flex items-center justify-center">
          <div
            ref={emojiRef}
            className="text-3xl leading-none select-none"
          >
            {emojis[0]}
          </div>
        </div>

        <h3 className="text-secondary text-lg md:text-2xl font-medium fugaz-one">
          DropYY !
        </h3>
      </div>

      <div className="h-full">
                <SunDarkLightToggle />
      </div>
    </div>
  );
};

export default DropYY;
