import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { companies } = useSelector((s) => s.company);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const selectChangeHandler = (value) => {
    const company = companies.find((c) => c.name.toLowerCase() === value);
    setInput({ ...input, companyId: company?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f2ecff] to-[#ebe3ff]">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Title", name: "title", placeholder: "e.g. Frontend Dev" },
              { label: "Description", name: "description", placeholder: "Short summary" },
              { label: "Requirements", name: "requirements", placeholder: "Skills / stacks" },
              { label: "Salary", name: "salary", placeholder: "₹ or $" },
              { label: "Location", name: "location", placeholder: "City / Remote" },
              { label: "Job Type", name: "jobType", placeholder: "Full‑time, Part‑time" },
              { label: "Experience", name: "experience", placeholder: "2+ years" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <Label className="text-gray-700">{field.label}</Label>
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  className="bg-gray-50 border border-gray-300 placeholder:text-gray-400 focus:ring-[#6A38C2] focus:border-[#6A38C2] text-sm"
                />
              </div>
            ))}

            {/* Positions */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="bg-gray-50 border border-gray-300 placeholder:text-gray-400 focus:ring-[#6A38C2] focus:border-[#6A38C2] text-sm"
              />
            </div>

            {/* Company Select */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label className="text-gray-700">Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                    <SelectGroup>
                      {companies.map((c) => (
                        <SelectItem
                          key={c._id}
                          value={c.name.toLowerCase()}
                          className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 focus:bg-[#f1e7ff] focus:text-[#6A38C2] rounded-sm"
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600">
                  * Please register a company first
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2] hover:bg-[#4c2895] text-white"
            >
              Post New Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
