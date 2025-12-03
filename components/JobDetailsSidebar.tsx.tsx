"use client";
import React from "react";
import { List, BarChart3 } from "lucide-react";
import JobCard from "./JobsCard";





export default function JobDetailsSidebar({ job }: any) {
  // static recommended jobs (you can supply your own)
  const recommended = [
    {
      name: "Frontend Developer",
      companyName: "Google",
      experience: 2,
      salary: "6 LPA",
      location: ["Bangalore", "Remote"],
      keySkills: ["React", "Next.js", "Tailwind", "Redux"],
      description: "Build UI components for large-scale apps",
      posted: "2025-01-05T10:00:00Z",
    },
    , {
      name: "Full Stack Engineer",
      companyName: "Flipkart",
      experience: 4,
      salary: "12 LPA",
      location: ["Chennai"],
      keySkills: ["React", "Node.js", "SQL"],
      description: "Work on end-to-end systems",
      posted: "2025-01-01T10:00:00Z",
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
    },
  ];

  return (
    <div className="space-y-4">
      {/* Card: Jobs you might be interested */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Jobs you might be interested in</h4>
          <span className="text-xs text-gray-500">See all</span>
        </div>

        <div className="space-y-3">
          {recommended.map((r, i) => (
            <div key={i}>
              {/* Use your JobCard but small: pass cardSize=false */}
              <JobCard jobDetails={r} cardSize={false} isApply={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Salary insights */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Salary Insights</h4>
          <BarChart3 size={18} className="text-gray-500"/>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <div className="text-xs">Compare salaries of {job.name} roles</div>
          <div className="mt-2 font-semibold text-gray-800">Avg. salary - 2.9 LPA</div>

          <div className="mt-4 text-xs">
            <div className="flex justify-between"><span>Min</span><span>Max</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2"><div className="bg-gray-400 h-2 rounded-full w-[60%]"></div></div>
          </div>
        </div>
      </div>

      {/* Small card: Services / CTA
      <div className="bg-white p-4 rounded-xl shadow-sm text-sm">
        <div className="font-semibold mb-2">Services you might be interested in</div>
        <div className="text-gray-600">Resume Display, Featured Profile & more</div>
      </div> */}
    </div>
  );
}
