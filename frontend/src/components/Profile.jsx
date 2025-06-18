import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-fuchsia-50 to-violet-50">
      {/* Navbar */}
      <Navbar />

      {/* Primary Card */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-xl backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <Avatar className="h-24 w-24 border border-gray-200">
                <AvatarImage
                  src={
                    user?.profile?.avatar ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  {user?.fullname || "Unnamed User"}
                </h1>
                <p className="text-sm text-slate-600 sm:text-base">
                  {user?.profile?.bio || "No bio provided."}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-max"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="h-5 w-5 shrink-0" />
              <span className="break-all text-sm sm:text-base">
                {user?.email || "Not Provided"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Contact className="h-5 w-5 shrink-0" />
              <span className="text-sm sm:text-base">
                {user?.phoneNumber || "Not Provided"}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="mb-2 text-lg font-medium text-slate-800">Skills</h2>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1 font-medium">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-500">NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8 grid w-full max-w-sm items-start gap-1.5">
            <Label className="text-md font-medium text-slate-800">Resume</Label>
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-600 hover:underline"
              >
                {user.profile.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span className="text-sm text-slate-500">NA</span>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
          className="mt-10 rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-sm"
        >
          <h2 className="mb-5 text-lg font-bold text-slate-800">Applied Jobs</h2>
          <AppliedJobTable />
        </motion.div>
      </section>

      {/* Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
