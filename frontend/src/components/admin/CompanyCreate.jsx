import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company?._id}`);
      }
    } catch (error) {
      toast.error("Failed to create company");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6ff]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Company
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter your company name to get started. You can update this later.
          </p>

          <div className="mb-6">
            <Label className="text-gray-700">Company Name</Label>
            <Input
              type="text"
              className="mt-2"
              placeholder="e.g. JobHunt, Microsoft"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
