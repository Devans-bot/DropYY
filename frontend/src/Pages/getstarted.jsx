import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import DropYY from "../Components/logonav";
import RandomBackground from "../Components/randomimages";
import EmojiFieldMobile from "../Components/emojis";
import EmojiWallpaper from "../Components/emojiwallpaper";
import ScaleDownButton from "../Components/ontapAnimate";

const GetStarted = () => {


   const [animate, setAnimate] = useState(false);
   const navigate=useNavigate()

useEffect(() => {
  const updateTheme = () => {
    setAnimate(false);
    
    // tiny delay to restart animation
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  };

  const observer = new MutationObserver(updateTheme);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => observer.disconnect();
}, []);


  return (
    <>
      {/* ================= MOBILE LAYOUT ================= */}
      <div className="md:hidden h-screen w-screen relative flex flex-col items-center justify-end">
        <DropYY />
        <RandomBackground />

        <div
          className="absolute mb-6 w-13/14 h-6/10
          backdrop-blur-md bg-primary/30
          border-2 border-secondary/30
          rounded-4xl
          shadow-2xl shadow-black
          flex flex-col items-center justify-evenly
          px-6 text-center"
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-secondary">
              Ready to Drop In?
            </h1>
            <p className="text-secondary/80 text-sm">
              Your vibe. Your crew. Your world.
              <br />
              Let’s get you inside 👀
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            
          <ScaleDownButton
          to="/Signup"
            className="
             w-full py-3 rounded-3xl
            bg-primary/90 border-2 border-secondary/40
            text-secondary font-bold text-lg"
          >
              Create Account

          </ScaleDownButton>

            <ScaleDownButton
              to="/Login"
             className="
               w-full py-3 rounded-3xl
                bg-secondary text-primary
               font-bold text-lg ">
              Log In
          </ScaleDownButton>
  


          </div>

          <div className="flex items-center w-full gap-3">
            <div className="flex-1 h-[1px] bg-secondary/40" />
            <span className="text-secondary/70 text-sm">
              or continue with
            </span>
            <div className="flex-1 h-[1px] bg-secondary/40" />
          </div>

          <div className="flex gap-4 w-full">
            <button
              className="flex-1 py-3 rounded-3xl
              border-2 border-secondary/40
              bg-primary/70 backdrop-blur-sm
              flex items-center justify-center gap-2
              text-secondary font-medium
              hover:scale-105 transition"
            >
              <FaGoogle />
              Google
            </button>

            <button
              className="flex-1 py-3 rounded-3xl
              border-2 border-secondary/40
              bg-primary/70 backdrop-blur-sm
              flex items-center justify-center gap-2
              text-secondary font-medium
              hover:scale-105 transition"
            >
              <FaApple />
              Apple
            </button>
          </div>
        </div>
      </div>

    {/* ================= DESKTOP – DEPTH MODE ================= */}





<div
  className={`absolute w-[440px] hidden md:flex backdrop-blur-xl bg-primary/20 border border-secondary/30 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] px-12 py-14 flex flex-col gap-8 text-center transition-all duration-500 ${
    animate ? "animate-fadeUpSmooth" : ""
  }`}
>

      {/* Headline */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-secondary tracking-wide">
          Ready to Drop In?
        </h1>

        <p className="text-secondary/80 leading-relaxed">
          Your vibe. Your crew. Your world.
          <br />
          Let’s make it official.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">

        <Link
          to="/Signup"
          className="
          py-3 rounded-3xl
          bg-secondary text-primary
          font-semibold
          hover:scale-105 hover:opacity-90
          transition duration-300
          "
        >
          Create Account
        </Link>

        <Link
          to="/Login"
          className="
          py-3 rounded-3xl
          border border-secondary/40
          text-secondary
          hover:bg-secondary hover:text-primary
          transition duration-300
          "
        >
          Log In
        </Link>

      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-[1px] bg-secondary/30" />
        <span className="text-secondary/60 text-sm">
          or continue with
        </span>
        <div className="flex-1 h-[1px] bg-secondary/30" />
      </div>

      {/* Social */}
      <div className="flex gap-4">

        <button
          className="
          flex-1 py-3 rounded-3xl
          bg-white/10
          border border-secondary/30
          text-secondary
          flex items-center justify-center gap-2
          hover:bg-white/20
          transition duration-300
          "
        >
          <FaGoogle />
          Google
        </button>

        <button
          className="
          flex-1 py-3 rounded-3xl
          bg-white/10
          border border-secondary/30
          text-secondary
          flex items-center justify-center gap-2
          hover:bg-white/20
          transition duration-300
          "
        >
          <FaApple />
          Apple
        </button>

      </div>

    </div>
  


  



    </>
  );
};

export default GetStarted;
