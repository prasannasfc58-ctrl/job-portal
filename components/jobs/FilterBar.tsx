"use client";
import React, { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationTerm: string;
  setLocationTerm: (value: string) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  selectedTypes,
  setSelectedTypes,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const employmentTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Freelance",
  ];

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6 w-full z-20 relative">
      <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-200 transition-all">
        <Search className="text-gray-400 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 h-full py-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-200 transition-all">
        <MapPin className="text-gray-400 mr-3" size={20} />
        <input
          type="text"
          placeholder="Location..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 h-full py-1"
          value={locationTerm}
          onChange={(e) => setLocationTerm(e.target.value)}
        />
      </div>

      <div className="relative">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`h-full px-4 flex justify-center items-center rounded-xl border shadow-sm transition-all gap-2 ${
            showFilters || selectedTypes.length > 0
              ? "bg-white border-orange-500 text-orange-600"
              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          <SlidersHorizontal size={18} />

          <span className="text-sm font-semibold">Job Type</span>

          {selectedTypes.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
          )}
        </button>

        {showFilters && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Employment Type
            </div>
            <div className="space-y-1">
              {employmentTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span
                    className={`text-sm font-medium group-hover:text-orange-700 ${
                      selectedTypes.includes(type)
                        ? "text-orange-700 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
