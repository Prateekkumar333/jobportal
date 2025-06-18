import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * LatestJobCards – Responsive, animated job card that fits the Home page aesthetic.
 *
 * 🔹 Subtle gradient background & glass‑like blur
 * 🔹 Spring hover lift with soft shadow
 * 🔹 Responsive typographic scale (xs → xl)
 * 🔹 Line‑clamped description to keep uniform height
 */
const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="group w-full cursor-pointer rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 backdrop-blur-sm"
    >
      {/* Company */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-semibold text-slate-800 sm:text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-xs text-slate-500 sm:text-sm">India</p>
      </div>

      {/* Title & short description */}
      <div className="mt-3 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
          {job?.title}
        </h2>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base">
          {job?.description}
        </p>
      </div>

      {/* Meta badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="ghost" className="font-bold text-blue-700">
          {job?.position} Positions
        </Badge>
        <Badge variant="ghost" className="font-bold text-[#F83002]">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="font-bold text-[#7209b7]">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
