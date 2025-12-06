"use client";
import { Briefcase, Hourglass, Plus, Users, XCircle, Search, MapPin, ChevronDown } from "lucide-react";
import React, { useEffect } from "react";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  status: "Published" | "Draft" | "On-Hold" | "Closed";
  applicants: number;
  avatars?: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Published",
    applicants: 42,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFxt7dGO7G1vlE0itQcRgO_4GlEcnatCsxHZXnE3tvkiXYGVywJspCjo1-gAS7h74Ypk4zn1xlWS1F39mWUrHeiGN1MTcfzpnEuOgo5UGnQJX7bMY_w9-_CTPj4Xk9Jc2Nu_0nisIlxSNiCSqKRLHeM80jf-WP8-UfMnWe8rYq5I2FXY4somizfl53fItxw5-Jii-hmiTxWCA2M655bjh-7iaaK19ILZM5B20lneR15B2cxC0aIfmM7fDuktvdutG75D2Jwn1ZzOM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA189IsVyfE6Be2NQNNInp9qehwYwc8fSELshmmY9ECGHejR5JPX70PaIwua43VS5QJMF_pe2w3UY7_ysqRh48_nXXeSp2j7ZJDwoN5X_pISDRTVNs7MXRnk6GUdAb99bdXtJHPX9gnuCYeDqGqoKb-d-pUv7CDxLbDWEh9D6tXkwQLVXuhhMqpp6SJTy1JTYn0lrqbaq2Imp9Lq9WI20zq84AzL29zII89dhj9I7hjoxELDExlLx41RJnpkgUJTG7nw4NxxvDp368",
    ],
  },
  {
    id: 2,
    title: "Product Manager",
    location: "New York, NY",
    type: "Full-time",
    status: "Closed",
    applicants: 0,
  },
  {
    id: 3,
    title: "UX/UI Designer",
    location: "Remote",
    type: "Contract",
    status: "Closed",
    applicants: 151,
  },
  {
    id: 4,
    title: "Data Scientist",
    location: "Austin, TX",
    type: "Full-time",
    status: "Closed",
    applicants: 23,
  },
  // ... add remaining jobs
];

const statusColors: Record<Job["status"], string> = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-slate-100 text-slate-800",
  "On-Hold": "bg-amber-100 text-amber-800",
  Closed: "bg-red-100 text-red-800",
};

export default function JobPosts() {
   useEffect(() => {
  
      const hasReloaded = sessionStorage.getItem("CompanyHome");
    console.log("enter",hasReloaded);
      if (hasReloaded == "false"|| !hasReloaded ) {
        console.log("enter");
        
        sessionStorage.setItem("CompanyHome", "true");
        window.location.reload();
   // reload only once
      }
    }, []); 
  return (
    <div className="flex h-screen font-inter bg-slate-50 text-slate-800">
   

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 p-2 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Job Posts</h1>
        
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {/* Add new job */}
         <div className="flex items-center justify-end mb-6">
  <a
    className="bg-primary text-white font-semibold py-3 px-5 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
    href="/add-job"
  >
    <Plus className="h-5 w-5" /> New Job
  </a>
</div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

    {/* Search Input */}
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
      <input
        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary"
        placeholder="Search by job title or skill"
        type="text"
      />
    </div>

    {/* Location Input */}
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
      <input
        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary"
        placeholder="Location (city, state, or remote)"
        type="text"
      />
    </div>

    {/* Employment Type */}
    <div className="relative">
      <select className="w-full pl-4 pr-10 py-3 appearance-none bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary">
        <option>All Employment Types</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
    </div>

  </div>
</div>

          {/* Status Cards */}
    

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Open Positions */}
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
    <div className="bg-green-100 p-3 rounded-full">
      <Briefcase className="h-6 w-6 text-green-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">Open Positions</p>
      <p className="text-3xl font-bold">12</p>
    </div>
  </div>

  {/* Total Applicants */}
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
    <div className="bg-blue-100 p-3 rounded-full">
      <Users className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">Total Applicants</p>
      <p className="text-3xl font-bold">289</p>
    </div>
  </div>

  {/* On-Hold */}
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
    <div className="bg-amber-100 p-3 rounded-full">
      <Hourglass className="h-6 w-6 text-amber-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">On-Hold</p>
      <p className="text-3xl font-bold">3</p>
    </div>
  </div>

  {/* Closed */}
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
    <div className="bg-red-100 p-3 rounded-full">
      <XCircle className="h-6 w-6 text-red-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">Closed</p>
      <p className="text-3xl font-bold">27</p>
    </div>
  </div>
</div>


          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm text-slate-500">{job.location} | {job.type}</p>
                  </div>
                  <span className={`text-xs font-semibold py-1 px-3 rounded-full ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </div>
               <div className="flex items-center justify-between pt-4 border-t border-slate-200">
  {job.applicants > 0 ? (
    <div className="flex items-center -space-x-2">
      {job.avatars?.slice(0, 3).map((avatar, i) => (
        <img
          key={i}
          className="h-8 w-8 rounded-full border-2 border-white"
          src={avatar}
          alt={`applicant ${i + 1}`}
        />
      ))}

      {job.applicants > 3 && (
        <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500">
          +{job.applicants - 3}
        </div>
      )}
    </div>
  ) : (
    <p className="text-sm text-slate-500">No applicants yet.</p>
  )}

  {/* ⬇️ Modified redirect link */}
  <a
    className="text-sm font-semibold text-orange-600 hover:underline"
    href="/company-list"
  >
    {job.applicants > 0 ? "View Applicants" : "Complete"}
  </a>
</div>

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
