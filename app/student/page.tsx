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
        <FilterComponent filters={STATIC_JOBS.jobs} onToggleFilter={function (key: "salaryRanges" | "workModes" | "experienceLevels" | "jobTypes" | "locations", value: string): void {
            throw new Error("Function not implemented.");
          } } onClear={function (): void {
            throw new Error("Function not implemented.");
          } }/>
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

      


      </aside>
    </div>
    
  );
}
