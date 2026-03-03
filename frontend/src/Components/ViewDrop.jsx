import React, { useEffect, useState } from "react";
import { UseAuthStore } from "../Store/authStore";

const ViewDrop = ({ drops, onclose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const {viewThisDrop}=UseAuthStore()
    const currentDrop = drops?.[currentIndex];

  // Detect video by extension
  const isVideo = currentDrop?.DropImage?.match(
    /\.(mp4|webm|ogg)$/i
  );

  useEffect(() => {
    if (!drops || drops.length === 0) return;

    if (currentIndex >= drops.length) {
      onclose();
      return;
    }

    const id=drops[currentIndex]?._id

    viewThisDrop(id)
    let timer
    if(!isVideo){
       timer = setTimeout(() => {
      setProgressKey(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    }, 5000);
    }
    

    return (timer) => clearTimeout(timer);
  }, [currentIndex, drops]);

  if (!drops[currentIndex]) return null;

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setProgressKey(prev => prev + 1);

  };

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={handleNext}
    >
     

     {/* Media Render */}
      {isVideo ? (
        <>
         <div className="absolute top-0 left-0 w-full h-1 bg-primary/50">
        <div
          key={progressKey}
          className="h-full bg-secondary/40 "
        />
      </div>
        <video
          src={currentDrop.DropImage}
          autoPlay
          muted
          playsInline
          onEnded={handleNext}
          className="w-full h-full object-contain"
        />
        </>
        
      ) : (
        <>
         <div className="absolute top-0 left-0 w-full h-1 bg-primary/50">
        <div
          key={progressKey}
          className="h-full bg-secondary/40 animate-progress"
        />
      </div>
         <img
          src={currentDrop.DropImage}
          className="w-full h-full object-contain transition-opacity duration-300"
          alt=""
        />
        </>
       
      )}

     
    </div>
  );
};

export default ViewDrop;
