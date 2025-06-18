import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((s) => s.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ---------- handlers ---------- */
  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- pre‑fill ---------- */
  useEffect(() => {
    setInput({
      name: singleCompany.name ?? "",
      description: singleCompany.description ?? "",
      website: singleCompany.website ?? "",
      location: singleCompany.location ?? "",
      file: null,
    });
  }, [singleCompany]);

  /* ---------- ui ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f2ecff] to-[#ebe3ff]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-600 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
          </div>

          {/* Grid inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Company Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Company name"
                className="placeholder:text-gray-400 border border-gray-400 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Short description"
                className="placeholder:text-gray-400 border border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="placeholder:text-gray-400 border border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, Country"
                className="placeholder:text-gray-400 border border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label className="text-gray-700">Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} className="border border-gray-400" />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#4d2b93] text-white"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
