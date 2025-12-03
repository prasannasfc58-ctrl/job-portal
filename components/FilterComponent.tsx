"use client";
import React, { useState } from "react";

const FilterComponent = () => {
    const filters = [
        {
            title: "Job Type",
            options: ["Full Time", "Part Time", "Internship", "Contract", "Freelance"],
        },
        {
            title: "Work Mode",
            options: ["Onsite", "Remote", "Hybrid"],
        },
        {
            title: "Experience Level",
            options: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
        },
        {
            title: "Salary Range",
            options: ["Below ₹20,000", "₹20,000 - ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"],
        },
        {
            title: "Location",
            options: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi"],
        },
    ];

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleChange = (option: string) => {
        setSelectedFilters((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 bg-white rounded-2xl shadow-sm border border-gray-200">
            {filters.map((filter) => (
                <div
                    key={filter.title}
                    className="border-b border-gray-200 pb-4 last:border-0"
                >
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">
                        {filter.title}
                    </h3>

                    <div className="space-y-2">
                        {filter.options.map((option) => (
                            <label
                                key={option}
                                className="flex items-center space-x-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(option)}
                                    onChange={() => handleChange(option)}
                                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150 ease-in-out"
                                />
                                <span className="text-gray-600 group-hover:text-blue-600 transition-colors text-sm">
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
};

export default FilterComponent;