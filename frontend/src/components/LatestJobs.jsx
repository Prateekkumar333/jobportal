import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-8">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <span className="text-slate-500 text-sm">No Jobs Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
