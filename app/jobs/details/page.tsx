"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { ListChecks, Building } from "lucide-react";
import JobDetailsHeader from "@/components/JobDetailsHeader"; 

import JobDetailsSidebar from "@/components/JobDetailsSidebar.tsx";


export default function JobDetailsPage() {
  const sp = useSearchParams();
  const q = sp.get("object");
  // parse passed jobDetails object (from JobCard)
  const object = q ? JSON.parse(decodeURIComponent(q)) : null;
  const job: any = object?.jobDetails ;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: main content (col-span 8) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Header card */}
            <JobDetailsHeader job={job} />

            {/* Job description */}
            <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">Job description</h3>
              <p className="text-gray-700 leading-relaxed">{job.jobOverview}</p>

              <div className="pt-3">
                <h4 className="font-semibold">Role</h4>
                <p className="text-gray-700">{job.name}</p>
              </div>

              <div className="pt-3">
                <h4 className="font-semibold">Interview Mode</h4>
                <p className="text-gray-700">Walkin & Virtual</p>
              </div>

              <div className="pt-3">
                <h4 className="font-semibold">Number of Vacancies</h4>
                <p className="text-gray-700">50</p>
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section className="bg-white p-6 rounded-xl shadow-sm space-y-3">
              <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>Freshers are eligible.</li>
                <li>12th pass or Graduate candidates are eligible.</li>
                <li>6 days work with 1 rotational week off.</li>
                <li>24/7 (any 9-hour shift), must be willing to work in night shift.</li>
              </ul>
            </section>

            {/* About company */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">About company</h3>
              <p className="text-gray-700">
                <span className="text-gray-950 font-semibold">Address: </span>
              Ashar IT Park, 2nd floor,Jayshree Baug, Road No. 16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604
              </p>
            </section>

            {/* Similar jobs */}
            {/* <SimilarJobs /> */}
          </div>

          {/* RIGHT: sidebar (col-span 4) */}
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            <JobDetailsSidebar job={job} />
          </aside>
        </div>
      </div>
    </div>
  );
}
