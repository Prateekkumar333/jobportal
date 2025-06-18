import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

/**
 * UpdateProfileDialog – polished dialog with glassy background & responsive layout
 *
 * 🔹 Matches Home / Profile gradient aesthetic
 * 🔹 Wider on medium+ screens, still comfy on mobile
 * 🔹 Bouncy loading state
 */
const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  /* ——— Handlers ——— */
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries({
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      bio: input.bio,
      skills: input.skills,
    }).forEach(([k, v]) => formData.append(k, v));
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  /* ——— UI ——— */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-full rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-md p-6 md:p-8 shadow-xl sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Full Name */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="fullname" className="md:text-right">
              Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Email */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="email" className="md:text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Phone */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="phoneNumber" className="md:text-right">
              Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Bio */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="bio" className="md:text-right">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Skills */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="skills" className="md:text-right">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              placeholder="e.g. HTML, CSS, React"
              value={input.skills}
              onChange={changeEventHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Resume */}
          <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="file" className="md:text-right">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="md:col-span-3"
            />
          </div>

          {/* Actions */}
          <DialogFooter className="md:justify-end">
            {loading ? (
              <Button disabled className="w-full md:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 md:w-auto">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
