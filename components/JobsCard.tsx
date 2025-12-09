"use client";

import { useRouter } from "next/navigation";
import { Briefcase, Wallet, MapPin, FileText, Clock } from "lucide-react";
import { useMemo } from "react";

export default function JobCard({ jobDetails, cardSize }: any) {
  const router = useRouter();

  // Redirect to job details page with static data
  const openDetails = () => {
    router.push(
      `/student/details?object=${encodeURIComponent(
        JSON.stringify({ jobDetails })
      )}`
    );
  };

  // Time difference → "2 days ago"
  const currentDate = new Date();
  const postedDate = new Date(jobDetails?.posted);
  const diff = currentDate.getTime() - postedDate.getTime();
  const hours = Math.floor(diff / (1000 * 3600));
  const days = Math.floor(hours / 24);
  const postedString = days > 0 ? `${days} days` : `${hours} hours`;

  const skills = jobDetails?.keySkills?.slice(0, 4);

  // 🔥 Random Score (0–100) — stays stable per card
  const randomScore = useMemo(() => Math.floor(Math.random() * 101), []);

  // 🔥 Random Green Shades
  const greenColors = ["#15803D"];
  const randomGreen = useMemo(
    () => greenColors[Math.floor(Math.random() * greenColors.length)],
    []
  );

  // 🔥 Circular Progress Calculations
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (randomScore / 100) * circumference;

  return (
    <div
      onClick={openDetails}
      className="p-4 rounded-xl shadow bg-white border border-gray-300 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:scale-[1.03]"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Left: Job title + company */}
        <div>
          <div className="font-bold text-[#505050] text-[16px] pb-[5px]">
            {jobDetails?.name}
          </div>

          {cardSize && (
            <div className="font-medium text-sm opacity-70">
              {jobDetails?.companyName}
            </div>
          )}
        </div>

        {/* Right: Posted + Score */}
        <div className="flex items-center gap-4">
          {/* Posted */}
          {cardSize && (
            <div className="flex items-center text-gray-700 text-sm">
              <Clock size={15} className="mr-1" />
              Posted: {postedString} ago
            </div>
          )}

          {/* Score Chart */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={randomGreen}
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Score Text */}
            <span className="absolute text-xs font-bold text-gray-700">
              {randomScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {cardSize && (
        <div className="flex mt-2 text-sm text-gray-700">
          <FileText size={16} className="mr-2 mt-[3px]" />
          {jobDetails?.description}
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div className="flex gap-2 flex-wrap mt-3">
          {skills.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 bg-orange-400 text-white rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="border border-gray-300 my-3" />

      {/* Bottom Details */}
      <div className="flex justify-start gap-6 text-sm text-gray-800">
        {/* Experience */}
        <div className="flex items-center">
          <Briefcase size={15} className="mr-1" />
          {jobDetails?.experience} Years
        </div>

        {/* Salary */}
        <div className="flex items-center">
          <Wallet size={15} className="mr-1" />
          {jobDetails?.salary}
        </div>

        {/* Location */}
        <div className="flex items-center">
          <MapPin size={15} className="mr-1" />
          {jobDetails?.location?.join(", ")}
        </div>
      </div>
    </div>
  );
}
