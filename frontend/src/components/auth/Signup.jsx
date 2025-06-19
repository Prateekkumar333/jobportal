import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null, 
  });

  const { loading, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] ?? null });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, val]) => {
      if (val !== "" && val !== null) formData.append(key, val);
    });

    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f2ecff] to-[#ebe3ff]">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Full Name</Label>
            <Input
              name="fullname"
              placeholder="John Doe"
              value={input.fullname}
              onChange={changeEventHandler}
              className="placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={input.email}
              onChange={changeEventHandler}
              className="placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              name="phoneNumber"
              placeholder="8080808080"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="•••••••"
              value={input.password}
              onChange={changeEventHandler}
              className="placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            <div className="flex items-center gap-6">
              {["student", "recruiter"].map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                  />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-gray-700">Profile</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2] hover:bg-[#4c2895] text-white"
            >
              Signup
            </Button>
          )}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6A38C2] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
