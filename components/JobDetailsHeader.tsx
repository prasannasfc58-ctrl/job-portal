"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Wallet, MapPin, Clock } from "lucide-react";
import { Progress } from "antd";

export default function JobDetailsHeader({ job }: any) {
  const requiredSkills = ["React", "Node.js", "Express", "MongoDB"];
  const yourSkills = ["Node.js", "Express"];

  const matchPercent = 70;
// skill match color based on percent
const getMatchColor = (percent: number) => {
  if (percent <= 40) return "#f87171";  // red-400
  if (percent <= 70) return "#1d4ed8";  // orange-400
  return "#10b981";                     // green-500
};
const [animatedPercent, setAnimatedPercent] = useState(0);

useEffect(() => {
  setTimeout(() => setAnimatedPercent(matchPercent), 200);
}, []);


  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">

      {/* ---------- TOP HEADER ---------- */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4">

            {/* Company Logo Placeholder */}
            <div className="w-16 h-16 rounded-lg bg-[#f3f6ff] flex items-center justify-center text-xl font-semibold text-orange-500">
              {job.companyName
                ?.split(" ")
                .map((s: string) => s[0])
                .slice(0, 2)
                .join("")}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {job.name}
              </h1>

              <div className="flex items-center gap-3 mt-2 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.companyName}
                </div>

                <div className="flex items-center gap-1">
                  <Wallet size={14} />
                  {job.salary}
                </div>

                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location?.join(", ")}
                </div>
              </div>
            </div>
          </div>
          <div>
       

          </div>
        </div>
       
  <div className="mt-5 flex justify-end">
<div className="relative group w-full sm:w-auto">
  <button
    style={{
      ["--progress" as any]: `${animatedPercent}%`,
      ["--color" as any]: getMatchColor(matchPercent),
    }}
    className="
      relative overflow-hidden 
      w-full sm:w-auto
      text-white font-semibold py-2.5 px-6 
      rounded-lg shadow-md cursor-pointer
      bg-gray-300
      transition-all duration-300
      before:absolute before:left-0 before:top-0 before:h-full 
      before:w-[var(--progress)] before:bg-[var(--color)]
      before:transition-all before:duration-700
      before:z-0
    "
  >
    <span className="relative z-10">
      {matchPercent}% Match – Apply Now
    </span>
  </button>

  {/* Tooltip only if under 80% */}
  {matchPercent < 80 && (
    <div
  className="
    absolute -top-12 left-1/2 -translate-x-1/2
    bg-cyan-500 text-white text-xs font-medium
    py-2 px-3 rounded-md shadow-lg
    opacity-0 group-hover:opacity-100
    scale-95 group-hover:scale-100
    transition-all duration-300 whitespace-nowrap
  "
>
   Enroll course to reach 100% match 🚀
</div>

  )}
</div>



</div>
      </div>

      {/* Meta Row */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          Posted just now
        </div>
        <div className="px-2 py-1 bg-gray-100 rounded text-xs">Openings: 50</div>
        <div className="px-2 py-1 bg-gray-100 rounded text-xs">
          Applicants: Less than 10
        </div>
      </div>

      {/* ---------- REQUIRED SKILLS ---------- */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Required Skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, i) => (
            <span
              key={i}
              className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- YOUR SKILLS ---------- */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Your Skills:</p>
        <div className="flex flex-wrap gap-2">
          {yourSkills.map((skill, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- SKILL MATCH PROGRESS ---------- */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Skill Match</span>
          <span className="text-sm font-semibold text-gray-700">
            {matchPercent}%
          </span>
        </div>

        {/* ANTD PROGRESS BAR */}
      <Progress
  percent={animatedPercent}
  showInfo={false}
  strokeColor={getMatchColor(matchPercent)}
/>

        <p className="text-xs text-gray-500 mt-1">
          You have completed {matchPercent}% of the required skills for this job.
        </p>
      </div>

      {/* ---------- SUGGESTED COURSES ---------- */}
      <div className="border-t border-gray-200 pt-5">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-800">
            To be fully qualified for this job, we recommend you complete a
            course in <b>React</b> and <b>MongoDB</b>.
          </p>

          <p className="text-sm text-orange-800 mt-2">
            Here's the course we offer:{" "}
            <a className="font-bold underline hover:text-orange-600" href="#">
              Advanced React & State Management
            </a>
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="w-full sm:w-auto bg-green-100 text-green-800 font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-green-200 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
            Enroll in Course
          </button>
        </div>
      </div>
    </div>
  );
}
