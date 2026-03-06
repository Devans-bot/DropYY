import React, { useRef } from "react";
import ScaleDownButton from "./ontapAnimate";
import { HiOutlineChatBubbleLeftRight, HiOutlineClock, HiOutlineCamera } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({
  onCapture,
  onStartRecording,
  onStopRecording,
  isRecording,
}) => {
  const tapTimeout = useRef(null);
  const lastTap = useRef(0);
  const navigate=useNavigate()
    const indicatorRef = useRef(null);


  const location = useLocation();
const isCameraActive = location.pathname === "/";
const isMessagesActive = location.pathname === "/Snaps";

  const handleTap = (e) => {
    e.preventDefault();

    const now = Date.now();
    const DOUBLE_DELAY = 250;

    // If recording → single tap stops
    if (isRecording) {
      onStopRecording?.();
      return;
    }

    // Double tap detection
    if (now - lastTap.current < DOUBLE_DELAY) {
      clearTimeout(tapTimeout.current);
      onStartRecording?.();
    } else {
      tapTimeout.current = setTimeout(() => {
        onCapture?.();
      }, DOUBLE_DELAY);
    }

    lastTap.current = now;
  };

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 
      w-full md:w-[60%] h-18 md:h-16 z-50
      bg-black backdrop-blur-xl px-4 gap-3 
      rounded-full flex items-center justify-around
      border-4 border-white/10"
    >
      {/* Left Icon */}
     <button
  onClick={() => navigate("/Snaps")}
  className={`w-1/2 flex items-center justify-center h-14 transition
    ${
      isMessagesActive
        ? "bg-white/80 rounded-full text-black"
        : "text-white/70 hover:text-white"
    }`}
>
  <HiOutlineChatBubbleLeftRight size={30} />
</button>


      {/* Camera Button */}
      <div
        className="relative   w-1/2 h-16 flex items-center justify-center"
        onClick={handleTap}
      >
        {/* Animated Ring */}
        <div
                  onClick={()=>navigate("/")}
          className={`absolute w-16 h-16 rounded-full border-2 ${
            isRecording
              ? "border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
              : "border-transparent"
          }`}
        />

        {/* Inner Button */}
        <div
          className={`h-14 rounded-full flex items-center justify-center transition-all duration-200
            ${
              isCameraActive ?
             "bg-white/80 rounded-full text-black"
        : "text-white/70 hover:text-white"
            }
             ${
            isRecording ? " scale-90 w-14" : "w-9/10 "
          }`}
        >
         
         <HiOutlineCamera size={30} className="" />

        </div>
      </div>

      {/* Right Icon */}
      
    </div>
  );
};

export default Navbar;
