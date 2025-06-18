import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-br from-[#f5f3ff] via-[#f0e9ff] to-[#ece2ff] py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-block px-4 sm:px-5 py-2 rounded-full bg-white/60 backdrop-blur-md text-[#F83002] font-semibold text-sm sm:text-base shadow-md">
          🚀 No. 1 Job Hunt Platform
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-gray-800">
          Search, Apply &<br className="hidden sm:block" />
          Get Your<span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
         Your future begins here — connect with top employers and apply in just a few clicks.
        </p>

        {/* Search Box - Slightly Smaller */}
        <div className="flex items-center max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-200 w-full h-12">
          <input
            type="text"
            placeholder="Search by job title or company..."
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 h-full text-sm outline-none bg-transparent placeholder:text-gray-400"
          />
          <button
            onClick={searchJobHandler}
            className="h-full px-5 bg-[#6A38C2] text-white hover:bg-[#211b2e] transition-colors rounded-r-full flex items-center justify-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
