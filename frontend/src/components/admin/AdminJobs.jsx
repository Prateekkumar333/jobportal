import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f9f7ff] via-[#f2ecff] to-[#ebe3ff]">
        <header className=" py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Admin <span className="text-[#5e2bb4]">Job Listings</span>
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Manage and publish new roles seamlessly.
            </p>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <Input
              className="flex-grow sm:flex-none sm:w-72 border-gray-300 focus:ring-[#7b48d3]"
              placeholder="Filter by title or role"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#6A38C2] hover:bg-[#4e2d9b] text-white px-6 py-2 shadow-md"
            >
              + New Job
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <AdminJobsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminJobs;
