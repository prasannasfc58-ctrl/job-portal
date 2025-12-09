"use client";
import React from "react";

interface JobTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts: { [key: string]: number };
}

const JobTabs = ({ activeTab, setActiveTab, counts }: JobTabsProps) => {
  const tabs = ["All", "Published", "Closed"];

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`group px-5 py-2.5 rounded-full text-sm font-semibold transition-all border flex items-center gap-2 ${
              isActive
                ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200 transform scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {tab}

            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              }`}
            >
              {counts[tab] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default JobTabs;
