import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    return Math.floor((currentTime - createdAt) / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group w-full rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 backdrop-blur-sm cursor-pointer"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-800">
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-4">
        <Avatar className="h-12 w-12 border border-gray-200">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-5">
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

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-gray-800 border-gray-300 hover:text-gray-900"
        >
          Details
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
