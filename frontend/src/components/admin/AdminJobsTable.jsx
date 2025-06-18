import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      const text = searchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(text) ||
        job?.company?.name?.toLowerCase().includes(text)
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-x-auto border border-gray-200">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-500">
          A list of your recently posted jobs.
        </TableCaption>

        <TableHeader className="bg-[#f3f0ff]">
          <TableRow>
            <TableHead className="text-gray-700 font-semibold text-sm">
              Company Name
            </TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm">
              Role
            </TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm">
              Date
            </TableHead>
            <TableHead className="text-right text-gray-700 font-semibold text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-[#f9f6ff] transition-colors duration-200"
              >
                <TableCell className="text-sm text-gray-800">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {job?.title}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 rounded-lg shadow-lg p-2 bg-white border">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job._id}`)
                        }
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 px-2 py-1 mt-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
