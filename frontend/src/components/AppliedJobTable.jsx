import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-[#1f1f2b] text-white rounded-xl shadow-lg p-6 overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

      <Table>
        <TableCaption className="text-sm text-gray-400">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Job Role</TableHead>
            <TableHead className="text-white">Company</TableHead>
            <TableHead className="text-right text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-6 text-gray-300">
                You haven&apos;t applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="text-gray-200">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-gray-200">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-gray-200">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-white px-3 py-1 rounded-full ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
