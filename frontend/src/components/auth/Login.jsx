import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  /* redirect if already logged in */
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f2ecff] to-[#ebe3ff]">
      <Navbar />

      {/* Centered card */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="placeholder:text-gray-400"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="•••••••"
              className="placeholder:text-gray-400"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          {/* Role selection */}
          <div className="flex items-center gap-6 text-gray-700">
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

          {/* Submit */}
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
              Login
            </Button>
          )}

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#6A38C2] hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
