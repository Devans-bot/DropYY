import React, { useEffect, useRef, useState } from "react";
import TakeSnap from "../Components/Takesnap";
import DropYY from "../Components/logonav";

const Home = () => {

  return (
    <>
    
    <div className="w-screen h-screen flex flex-col items-center   lg:w-8/10 xl:w-4/10 md:h-9/10 md:rounded-3xl overflow-hidden md:border-2 border-white/10 ">
    <div className="w-full md:hidden">
    <DropYY />
    </div>
    <TakeSnap/>
    
   
    </div>
    
    </>
  );
};

export default Home;
