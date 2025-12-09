import React from "react";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Building2,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
export interface JobCardProps {
  title: string;
  location: string;
  type: string;
  status: "Published" | "Closed" | "On Hold";
  applicantCount?: number;
  customFooterText?: string;
  customActionText?: string;
}

const JobCard = ({
  title,
  location,
  type,
  status,
  applicantCount,
  customFooterText,
  customActionText,
}: JobCardProps) => {
  const isPublished = status === "Published";
  const finalActionText =
    customActionText || (isPublished ? "View Applicants" : "Complete");
  const isCompleteAction = finalActionText === "Complete";
  const router = useRouter();
  return (
    <div className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 hover:border-orange-100 transition-all duration-300  flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm transition-colors duration-300 ${
            isPublished
              ? "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
              : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
          }`}
        >
          <Building2 size={20} />
        </div>

        <div
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase ${
            isPublished
              ? "bg-green-50 text-green-700 border-green-100"
              : "bg-gray-50 text-gray-400 border-gray-100"
          }`}
        >
          {status}
        </div>
      </div>

      <div className="mb-4">
        <h3
          className={`text-lg font-bold text-gray-900 leading-tight mb-2 transition-colors ${
            isPublished ? "group-hover:text-orange-600" : ""
          }`}
        >
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <MapPin size={12} className="text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <Clock size={12} className="text-gray-400" />
            <span>{type}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          {customFooterText ? (
            <span className="text-xs font-medium text-gray-400 italic">
              {customFooterText}
            </span>
          ) : (
            <>
              <Users
                size={14}
                className={applicantCount ? "text-orange-500" : "text-gray-300"}
              />
              <span className="text-md font-medium">
                <span className="text-gray-900 font-bold">
                  {applicantCount || 0}
                </span>{" "}
                Applicants
              </span>
            </>
          )}
        </div>

        {isCompleteAction ? (
          <button className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-green-50 hover:text-green-600 hover:border-green-100 border border-transparent px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer">
            {finalActionText}
            <CheckCircle size={12} />
          </button>
        ) : (
          <button className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
          onClick={()=>router.push('/company-list')}>
            {finalActionText}
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
