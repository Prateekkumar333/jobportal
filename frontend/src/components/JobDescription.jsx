import React, { useEffect, useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  /* 🔑  Compute “applied?” straight from Redux data (always in‑sync) */
  const isApplied = useMemo(
    () =>
      singleJob?.applications?.some(
        (application) => application.applicant === user?._id
      ) || false,
    [singleJob, user?._id]
  );

  /* 📨  APPLY handler */
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        /* redux me applications array update karo — UI auto‑refresh ho jayega */
        const updatedJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id } // minimum shape
          ]
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  /* 📥  Fetch single job on mount / jobId change */
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>

      <div className="my-4 space-y-1">
        <p>
          <span className="font-bold">Role:</span>{" "}
          <span className="pl-4 text-gray-800">{singleJob?.title}</span>
        </p>
        <p>
          <span className="font-bold">Location:</span>{" "}
          <span className="pl-4 text-gray-800">{singleJob?.location}</span>
        </p>
        <p>
          <span className="font-bold">Description:</span>{" "}
          <span className="pl-4 text-gray-800">{singleJob?.description}</span>
        </p>
        <p>
          <span className="font-bold">Experience:</span>{" "}
          <span className="pl-4 text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </p>
        <p>
          <span className="font-bold">Salary:</span>{" "}
          <span className="pl-4 text-gray-800">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <span className="font-bold">Total Applicants:</span>{" "}
          <span className="pl-4 text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </p>
        <p>
          <span className="font-bold">Posted Date:</span>{" "}
          <span className="pl-4 text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
