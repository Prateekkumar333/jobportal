import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-500 py-4">
          A list of recently applied users
        </TableCaption>
        <TableHeader className="bg-[#f6f2ff]">
          <TableRow>
            <TableHead className="text-gray-700 text-sm font-semibold">
              Full Name
            </TableHead>
            <TableHead className="text-gray-700 text-sm font-semibold">
              Email
            </TableHead>
            <TableHead className="text-gray-700 text-sm font-semibold">
              Contact
            </TableHead>
            <TableHead className="text-gray-700 text-sm font-semibold">
              Resume
            </TableHead>
            <TableHead className="text-gray-700 text-sm font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-gray-700 text-sm font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                No applicants found.
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-[#faf8ff] transition duration-150"
              >
                <TableCell className="text-sm text-gray-800">
                  {item?.applicant?.fullname || "—"}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {item?.applicant?.email || "—"}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {item?.applicant?.phoneNumber || "—"}
                </TableCell>
                <TableCell className="text-sm">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item?.applicant?.createdAt?.split("T")[0] || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 border rounded-lg shadow bg-white">
                      {shortlistingStatus.map((status, idx) => (
                        <div
                          key={idx}
                          onClick={() => statusHandler(status, item._id)}
                          className="text-sm text-gray-700 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          {status}
                        </div>
                      ))}
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

export default ApplicantsTable;
