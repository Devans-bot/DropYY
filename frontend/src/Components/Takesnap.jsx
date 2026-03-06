import React, { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Webcam from "react-webcam";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../Store/authStore";
import PhotoSendNavBar from "./photonav";

const TakeSnap = () => {
  const [seconds, setSeconds] = useState(0);
  const webcamRef = useRef(null);
  const {photo,setPhoto}=UseAuthStore()
  const navigate=useNavigate()
  const {video,setvideo}=UseAuthStore()
  const [showHint, setShowHint] = useState(true);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
  setPhoto(null)
  setvideo(null)
}, [])

useEffect(() => {
  const timer = setTimeout(() => {
    setShowHint(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    audio: false,
  });

  // Timer
  useEffect(() => {
    let interval;

    if (status === "recording") {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
  const prepareVideoFile = async () => {
    if (!mediaBlobUrl) return;

    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();

    const file = new File([blob], "video.mp4", {
      type: blob.type,
    });

    setvideo(file); // ✅ now real file stored
  };

  prepareVideoFile();
}, [mediaBlobUrl]);


const switchCamera = () => {
  setFacingMode(prev =>
    prev === "user" ? "environment" : "user"
  );
};

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    console.log(photo)
  };

  const isPreviewing = photo || mediaBlobUrl;

  return (
    <>
      <div className="bg-primary relative left-1/2 -translate-x-1/2 w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-sm bg-primary/10 pointer-events-none" />

        {!isPreviewing && (
          <div className="relative w-full flex flex-col  items-center justify-start h-9/10 md:h-full aspect-[9/16] overflow-hidden">
            <Webcam
              ref={webcamRef}
              mirrored={false}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{ facingMode,
              }}
    className={`w-full absolute z-10 rounded-3xl h-full object-cover border-5 border-blue-400
  ${facingMode === "user" ? "scale-x-[-1]" : ""}`}            />   
            {showHint && (
               <div className="absolute w-7/10 h-20 z-30  left-1/2 -translate-x-1/2 bottom-5
              bg-primary/60 text-secondary px-4 py-2 rounded-full text-md font-bold flex flex-col items-center justify-center
              animate-fadeInOut">
             <h3> Tap to capture 📸 </h3>
             <h3> Double tap to record 🔴</h3>

                </div>
             )}

            <div className="h-full rounded-3xl bg-black w-full z-0 absolute text-xl flex justify-center items-center font-bold text-white"  >
            <h1 >Opening 📸</h1>
            </div>
   <div 
        onClick={()=>navigate("/ProfilePage")}
        className="flex z-50  w-9 h-9 bg-primary/30 border-2 border-secondary/60 rounded-full items-center justify-center absolute top-5 md:top-5 right-8">
          <MdPerson size={25} />
        </div>
        <div
  onClick={switchCamera}
  className="absolute top-5 left-8 md:top-5 z-50 
  w-9 h-9 flex items-center justify-center 
  bg-primary/30 border-2 border-secondary/60 
  rounded-full text-white"
>
  🔄
</div>
          </div>
        )}

        {/* Recording Timer */}
        {status === "recording" && seconds > 0 && (
          <div className="absolute top-1/10 md:top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full z-20">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-white text-sm font-medium">
              {seconds}s
            </span>
          </div>
        )}

        {/* Profile Icon */}
     

        {/* Photo Preview */}
        {photo && !mediaBlobUrl && (
          <>
            <div
              onClick={() => {
                setPhoto(null);
                clearBlobUrl();
              }}
              className="absolute top-1/10 left-1/12 md:top-5 md:left-5 z-10 w-10 h-8 rounded-full bg-white/30 flex items-center justify-center border-2 border-secondary/60 "
            >
              <IoMdArrowRoundBack size={20} />
            </div>

            <img
              src={photo}
              className="absolute border-2 rounded-3xl border-blue-400 w-full  h-10/12 md:w-full md:h-full object-cover scale-x-[-1] "
            />
          </>
        )}

        {/* Video Preview */}
        {mediaBlobUrl && !photo && (
          <>
            <div
              onClick={() => {
                setPhoto(null);
                clearBlobUrl();
              }}
              className="absolute top-1/10 left-1/12 md:top-5 md:left-5 z-10 w-10 h-8 rounded-full bg-white/30 flex items-center justify-center border-2 border-secondary/60"
            >
              <IoMdArrowRoundBack size={20} />
            </div>

            <video
              src={mediaBlobUrl}
              autoPlay
              loop
              className="absolute border-2 rounded-3xl border-red-400 w-full  h-10/12 md:w-full md:h-full object-cover scale-x-[-1]"
            />
          </>
        )}
      </div>
       {
        photo || video ? <PhotoSendNavBar VideoData={video} PhotoData={photo}/> :
        <Navbar
        onCapture={capturePhoto}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        isRecording={status === "recording"}
      />
       }
      
    </>
  );
};

export default TakeSnap;
