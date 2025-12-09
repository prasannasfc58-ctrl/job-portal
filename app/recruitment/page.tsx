"use client";
import React, { useState } from "react";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  Ban,
  ArrowUpAZ,
  ArrowDownZA,
} from "lucide-react";
import StatsCard from "@/components/jobs/StatsCard";
import FilterBar from "@/components/jobs/FilterBar";
import JobTabs from "@/components/jobs/JobTabs";
import JobCard from "@/components/jobs/JobCard";

import { useRouter } from "next/navigation";
const jobList = [
  {
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full time",
    status: "Published",
    applicants: 39,
  },
  {
    role: "Product Manager",
    location: "New York, NY",
    type: "Internship",
    status: "Closed",
    applicants: 0,
  },
  {
    role: "Data Scientist",
    location: "Austin, TX",
    type: "Full time",
    status: "Published",
    applicants: 20,
  },
  {
    role: "UX/UI Designer",
    location: "Remote",
    type: "Contract",
    status: "Closed",
    applicants: 148,
  },
  {
    role: "Backend Engineer",
    location: "London, UK",
    type: "Full time",
    status: "Published",
    applicants: 12,
  },
  {
    role: "Digital Marketing Specialist",
    location: "Chicago, IL",
    type: "Part time",
    status: "Closed",
    applicants: 0,
  },
  {
    role: "DevOps Engineer",
    location: "Remote",
    type: "Contract",
    status: "Published",
    applicants: 56,
  },
  {
    role: "Sales Representative",
    location: "Miami, FL",
    type: "Full time",
    status: "Published",
    applicants: 5,
  },
  {
    role: "Human Resources Manager",
    location: "Seattle, WA",
    type: "Full time",
    status: "Closed",
    applicants: 0,
  },
  {
    role: "Graphic Designer",
    location: "Los Angeles, CA",
    type: "Freelance",
    status: "Published",
    applicants: 89,
  },
];

const JobDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const counts = jobList.reduce((acc, job) => {
    acc["All"] = (acc["All"] || 0) + 1;
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const totalApplicants = jobList.reduce((acc, job) => acc + job.applicants, 0);
  const router = useRouter();
  const filteredJobs = jobList
    .filter((job) => {
      if (activeTab !== "All" && job.status !== activeTab) return false;
      const matchesSearch = job.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(locationTerm.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some((type) =>
          job.type.toLowerCase().includes(type.toLowerCase())
        );
      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.role.localeCompare(b.role);
      return b.role.localeCompare(a.role);
    });

  return (
    <div className="p-8 w-full max-w-7xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            Job Board
          </h1>
          <p className="text-gray-500">Manage your openings and applicants.</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium flex items-center transition-all shadow-lg shadow-orange-200 hover:-translate-y-0.5"
        onClick={()=>router.push('/jobPosting')}>
          <Plus size={18} className="mr-2" /> Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Open Positions"
          count={counts["Published"] || 0}
          icon={<Briefcase size={24} />}
          iconBgClass="bg-indigo-50"
          iconColorClass="text-indigo-600"
        />
        <StatsCard
          title="Total Applicants"
          count={totalApplicants}
          icon={<Users size={24} />}
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-600"
        />
        <StatsCard
          title="On-Hold"
          count={counts["On Hold"] || 0}
          icon={<Clock size={24} />}
          iconBgClass="bg-amber-50"
          iconColorClass="text-amber-600"
        />
        <StatsCard
          title="Closed Jobs"
          count={counts["Closed"] || 0}
          icon={<Ban size={24} />}
          iconBgClass="bg-rose-50"
          iconColorClass="text-rose-600"
        />
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        {activeTab === "All" ? "All Jobs" : `${activeTab} Jobs`}
        <span className="text-xs font-normal text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-full">
          {filteredJobs.length}
        </span>
      </h2>
      <div className="flex justify-between items-center mb-6">
        <JobTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm hover:border-gray-300 hover:text-gray-700 transition-all"
        >
          {sortOrder === "asc" ? (
            <ArrowUpAZ size={16} />
          ) : (
            <ArrowDownZA size={16} />
          )}
          <span className="hidden sm:inline">Sort</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.role}
            location={job.location}
            type={job.type}
            status={job.status as "Published" | "Closed" | "On Hold"}
            applicantCount={job.applicants}
          />
        ))}
      </div>
    </div>
  );
};

export default JobDashboard;
