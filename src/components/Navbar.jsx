import React from "react";
import { Brain } from "lucide-react";
import { SunMedium } from 'lucide-react';




const Navbar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between  h-[90px] bg-zinc-900" style={{padding:"0px 150px"}}>
        <div className="logo flex items-center gap-2">
          <Brain size={50} color="#86198f"/>
          <span className="text-2xl font-bold text-white ml-2">AutoCodeCritic</span>
        </div>
        <div className="icon flex items-center gap-[20px]">
          <i className="cursor-pointer transition-all hover:text-[#86198f]"><SunMedium/></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
