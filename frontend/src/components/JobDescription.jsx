import React, { useEffect, useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((s) => s.job);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const isApplied = useMemo(
    () =>
      singleJob?.applications?.some((app) => app.applicant === user?._id) ||
      false,
    [singleJob, user?._id]
  );

  const applyJobHandler = async () => {
    if (isApplied) return;
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...singleJob.applications,
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (data.success) dispatch(setSingleJob(data.job));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [jobId, dispatch]);

  return (
    <div className="min-h-screen  bg-gray-100 text-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* card */}
        <div className="bg-gray-200  bg-gradient-to-br from-gray-600 via-gray-600 to-gray-700 b shadow-md border border-gray-300 p-8 rounded-2xl text-white">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                {singleJob?.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-red-100 text-red-800">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={applyJobHandler}
              disabled={isApplied}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-colors text-white ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* details */}
          <div className="mt-10 space-y-4 leading-relaxed  text-white">
            <DetailRow label="Role" value={singleJob?.title} />
            <DetailRow label="Location" value={singleJob?.location} />
            <DetailRow label="Description" value={singleJob?.description} />
            <DetailRow
              label="Experience"
              value={`${singleJob?.experience} yrs`}
            />
            <DetailRow label="Salary" value={`${singleJob?.salary} LPA`} />
            <DetailRow
              label="Total Applicants"
              value={singleJob?.applications?.length}
            />
            <DetailRow
              label="Posted Date"
              value={singleJob?.createdAt?.split("T")[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span>{" "}
    <span className="pl-2">{value || "—"}</span>
  </p>
);

export default JobDescription;
