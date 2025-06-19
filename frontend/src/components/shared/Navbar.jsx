import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#b9bfc5] via-[hsl(195,6%,86%)] to-[#aeb6be] border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-16">
        <Link to="/">
          <h1 className="text-[2rem] font-extrabold bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] bg-clip-text text-transparent">
            JobPortal
          </h1>
        </Link>

        <div className="hidden lg:flex flex-1 justify-end items-center">
          <ul className="flex gap-10 font-semibold text-[1.2rem] text-gray-800">
            {user?.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] relative group transition-all">
                  <Link to="/admin/companies">Companies</Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </li>
                <li className="hover:text-[#6A38C2] relative group transition-all">
                  <Link to="/admin/jobs">Jobs</Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] relative group transition-all">
                  <Link to="/">Home</Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </li>
                <li className="hover:text-[#6A38C2] relative group transition-all">
                  <Link to="/jobs">Jobs</Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </li>
                <li className="hover:text-[#6A38C2] relative group transition-all">
                  <Link to="/browse">Browse</Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#6A38C2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4 ml-8">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#4e2d9b] text-white text-sm px-5 py-2">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#6A38C2] shadow-md transition-transform hover:scale-105 duration-200">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 sm:w-80 mt-2 rounded-xl border shadow-lg p-4 bg-white dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-gray-300">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.profile?.bio || "No bio added"}
                    </p>
                  </div>
                </div>

                <div className="border-t my-4 border-gray-200 dark:border-gray-700" />

                <div className="flex flex-col space-y-3 text-sm">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#6A38C2] transition"
                    >
                      <User2 size={18} />
                      View Profile
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-4">
          <ul className="flex flex-col gap-3 font-semibold text-gray-700">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="pt-2 border-t">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full bg-gray-300 hover:bg-gray-400 text-sm"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#4e2d9b] text-white text-sm">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User2 size={18} />
                    View Profile
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 hover:text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
