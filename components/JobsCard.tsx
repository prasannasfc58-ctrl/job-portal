"use client";

import { useRouter } from "next/navigation";
import {
  Briefcase,
  Wallet,
  MapPin,
  FileText,
  Clock,
} from "lucide-react";

export default function JobCard({ jobDetails, cardSize }: any) {
  const router = useRouter();

  // Redirect to job details page with static data
  const openDetails = () => {
    router.push(
      `/jobs/details?object=${encodeURIComponent(
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

  return (
    <div
      onClick={openDetails}
      className="p-4 rounded-xl shadow bg-white border border-gray-300 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:scale-[1.03]"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Job title + company */}
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

        {/* Posted */}
        {cardSize && (
          <div className="flex items-center text-gray-700 text-sm">
            <Clock size={15} className="mr-1" />
            Posted: {postedString} ago
          </div>
        )}
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
              className="px-2 py-1 bg-orange-400 text-white 0 rounded text-xs"
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
