"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Empty, Pagination } from "antd";
import FilterComponent from "@/components/FilterComponent";
import JobCard from "@/components/JobsCard";
import KeyProfile from "@/components/KeyProfile";

const STATIC_JOBS = {
  count: 4,
  jobs: [
           {
      name: "React Developer",
      companyName: "CADD",
      experience: 4,
      salary: "12 LPA",
      location: ["Chennai"],
      keySkills: ["React", "Node.js", "SQL"],
      description: "Work on end-to-end systems",
      posted: "2025-01-01T10:00:00Z",
      aboutCompany : "Address: Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604"
    },
    {
      name: "Frontend Developer",
      companyName: "Google",
      experience: 2,
      salary: "6 LPA",
      location: ["Bangalore", "Remote"],
      keySkills: ["React", "Next.js", "Tailwind", "Redux"],
      description: "Build UI components for large-scale apps",
      posted: "2025-01-05T10:00:00Z",
      aboutCompany : "Address: Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604"
    },
    {
      name: "Backend Developer",
      companyName: "Amazon",
      experience: 3,
      salary: "10 LPA",
      location: ["Hyderabad"],
      keySkills: ["Node.js", "Express", "MongoDB"],
      description: "Build scalable backend APIs",
      posted: "2025-01-03T10:00:00Z",
        aboutCompany : "Address: Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604"
    },
    {
      name: "Full Stack Engineer",
      companyName: "Flipkart",
      experience: 4,
      salary: "12 LPA",
      location: ["Chennai"],
      keySkills: ["React", "Node.js", "SQL"],
      description: "Work on end-to-end systems",
      posted: "2025-01-01T10:00:00Z",
      aboutCompany : "Address: Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604"
    },
       {
      name: "Node JS Developer",
      companyName: "Messo",
      experience: 4,
      salary: "12 LPA",
      location: ["Chennai"],
      keySkills: ["React", "Node.js", "SQL"],
      description: "Work on end-to-end systems",
      posted: "2025-01-01T10:00:00Z",
      aboutCompany : "Address: Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604"
    }
  ],
};

export default function JobsStaticPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobs = STATIC_JOBS.jobs;
 useEffect(() => {

    const hasReloaded = sessionStorage.getItem("jobsReloaded");
  console.log("enter",hasReloaded);
    if (hasReloaded == "false"|| !hasReloaded ) {
      console.log("enter");
      
      sessionStorage.setItem("jobsReloaded", "true");
      window.location.reload();
 // reload only once
    }
  }, []); 
  return (
    <div className="min-h-screen  flex gap-6 px-6 py-6 mt-5">

      {/* LEFT FILTER PANEL */}
      <aside className="w-[280px] bg-white shadow-md rounded-2xl p-5 h-fit sticky top-6 transition-all">
        <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center gap-2">
          Filters
        </h3>

        <div className="space-y-3 text-gray-500">
        <FilterComponent/>
        </div>
      </aside>

      {/* MIDDLE JOB LIST */}
      <main className="flex-1">
        <div className="bg-white shadow-md rounded-2xl p-6 mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Recommended Jobs for You
          </h1>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10">
            <Empty
              description={<span className="text-gray-500 text-lg">No content found</span>}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <JobCard
                key={index}
                cardSize={true}
                isApply={false}
                jobDetails={job}
                FromJobs={true}
              />
            ))}

            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={STATIC_JOBS.count}
                pageSize={10}
                onChange={(p: any) => setCurrentPage(p)}
              />
            </div>
          </div>
        )}
      </main>

      {/* RIGHT PROFILE CARD */}
      <aside className="w-[280px] sticky " >
        <div className="bg-white shadow-md rounded-2xl p-5  top-6 ">
          <KeyProfile
            profileData={{
              name: "Prasanna",
              designation: "Backend Developer",
              location: "Chennai",
              experience: 3,
              mobile: "9876543210",
              salary: "6 LPA",
              noticePeriod: "30 Days",
              email: "prasanna@gmail.com"
            }}
          />
        </div>

      
<div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-lg p-6 text-center gap-4 mt-5 ">

  {/* Title */}
  <div className="flex flex-col items-center gap-2">
    <h1 className="text-lg font-bold text-gray-800">Your CADD Score</h1>
    <p className="text-sm text-gray-500">Based on recent activity.</p>
  </div>

  {/* Circular Score */}
  <div className="relative flex h-32 w-32 items-center justify-center">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
      <circle
        className="stroke-current text-gray-200"
        cx="50"
        cy="50"
        fill="transparent"
        r="46"
        strokeWidth="8"
      ></circle>

      {/* Progress ring → orange */}
      <circle
        className="stroke-current text-green-800"
        cx="50"
        cy="50"
        fill="transparent"
        r="46"
        strokeDasharray="289.027"
        strokeDashoffset="63.585"
        strokeLinecap="round"
        strokeWidth="8"
        transform="rotate(-90 50 50)"
      ></circle>
    </svg>

    {/* Score Text */}
    <div className="flex flex-col">
      <span className="text-4xl font-black leading-none text-gray-900">78</span>
      <span className="text-xs font-medium text-gray-500">/ 100</span>
    </div>
  </div>

  {/* Stats */}
  <div className="w-full flex flex-col items-center gap-4 pt-2">
    <div className="w-full divide-y divide-gray-200">
      <div className="flex justify-between py-2">
        <span className="text-sm font-medium text-gray-500">Course Completed:</span>
        <span className="text-sm font-bold text-gray-800">50%</span>
      </div>

      <div className="flex justify-between py-2">
        <span className="text-sm font-medium text-gray-500">Your Assessment Score:</span>
        <span className="text-sm font-bold text-gray-800">38%</span>
      </div>
    </div>

    {/* Button → changed to orange */}
    <button className="flex w-full max-w-[480px] h-10 cursor-pointer items-center justify-center rounded-lg bg-orange-400 text-white text-sm font-bold hover:bg-orange-500 transition-colors">
      <span className="truncate">Improve Score</span>
    </button>
  </div>

</div>

      </aside>
    </div>
    
  );
}
