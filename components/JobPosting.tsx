"use client";

import React, { useState, KeyboardEvent, useRef } from "react";
import { FiCalendar } from "react-icons/fi";
import { FaFileUpload } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import {
  FaTimes,
  FaPlus,
  FaCalendarAlt,
  FaBriefcase,
  FaArrowLeft,
} from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { TbInfoOctagonFilled, TbListDetails } from "react-icons/tb";
import { IoMdWarning } from "react-icons/io";
import { LuCircleCheckBig } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import {
  IoSettingsOutline,
  IoShieldCheckmark,
  IoTimerSharp,
} from "react-icons/io5";
import { FaUserTie, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import { PiListStarBold } from "react-icons/pi";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

import { FaWallet } from "react-icons/fa";

export default function AddJobPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const salaryUnits = ["Thousand", "Lakh", "Crore"];
  const salaryPeriods = ["Per Month", "Per Annum"];

  const [skillInput, setSkillInput] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    location?: string;
    description?: string;
    status?: string;
    employment?: string;
    experience?: string;
    deadline?: string;
    skills?: string;
    assessmentTitle?: string;
    assessmentFile?: string;
    salaryMin?: string;
    salaryMax?: string;
  }>({});
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    status: "",
    employment: "",
    experience: "",
    deadline: "",
    internalNotes: "",
    assessmentTitle: "",
    assessmentFile: null as File | null,
    salaryMin: "",
    salaryMax: "",
    workMode:"",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
 
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const employmentRef = useRef<HTMLSelectElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const assessmentTitleRef = useRef<HTMLInputElement>(null);
  const assessmentFileRef = useRef<HTMLInputElement>(null);
  const salaryMinRef = useRef<HTMLInputElement>(null);
  const salaryMaxRef = useRef<HTMLInputElement>(null);
const workModeRef = useRef<HTMLSelectElement>(null);
const locationRef = useRef<HTMLSelectElement>(null);



  const [showDialog, setShowDialog] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Creating job post...");
  const [progress, setProgress] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };
  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      description: "",
      status: "",
      employment: "",
      experience: "",
      deadline: "",
      internalNotes: "",
      assessmentTitle: "",
      assessmentFile: null,
      salaryMin: "",
      salaryMax: "",
      workMode:"",

    });

    setSkills([]);
    setSkillInput("");
    setErrors({});
    setProgress(0);
  };

  const handleSubmit = () => {
    const newErrors: any = {};

    // VALIDATION
    if (!formData.title.trim()) newErrors.title = "Job title is required.";
  
    if (!formData.description.trim())
      newErrors.description = "Description required.";
    if (!formData.status) newErrors.status = "Select a status.";
    if (!formData.employment) newErrors.employment = "Select employment type.";
    if (!formData.experience) newErrors.experience = "Select experience level.";
    if (!formData.deadline) newErrors.deadline = "Choose a deadline.";
    if (skills.length === 0) newErrors.skills = "Add at least one skill.";
    if (!formData.assessmentTitle.trim())
      newErrors.assessmentTitle = "Assessment title is required.";

    if (!formData.assessmentFile)
      newErrors.assessmentFile = "Upload an assessment file.";
    if (!formData.salaryMin.trim())
      newErrors.salaryMin = "Minimum salary is required.";

    if (!formData.salaryMax.trim())
      newErrors.salaryMax = "Maximum salary is required.";

    if (
      formData.salaryMax &&
      formData.salaryMin &&
      Number(formData.salaryMax) < Number(formData.salaryMin)
    )
      newErrors.salaryMax =
        "Maximum salary must be greater than minimum salary.";
if (!formData.workMode) newErrors.workMode = "Select work mode.";

if (!formData.location) newErrors.location = "Select location.";



    setErrors(newErrors);

    // FIND FIRST ERROR FIELD
    const firstErrorField = Object.keys(newErrors)[0];

    if (firstErrorField) {
      const scrollMap: any = {
        title: titleRef,
        location: locationRef,
        description: descriptionRef,
        status: statusRef,
        workMode: workModeRef,
        employment: employmentRef,
        experience: experienceRef,
        deadline: deadlineRef,
        skills: skillsRef,
        assessmentTitle: assessmentTitleRef,
        assessmentFile: assessmentFileRef,

        // NEW
        salaryMin: salaryMinRef,
        salaryMax: salaryMaxRef,
      };



      scrollMap[firstErrorField]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Snackbar
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    // --------------------------------------------------------
    // 🎉 FINAL PAYLOAD — ready to send to backend
    // --------------------------------------------------------
    const finalPayload = {
      ...formData,
      skills: skills,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    console.log("FINAL PAYLOAD:", finalPayload);

    // OPEN DIALOG
    setShowDialog(true);
    setLoadingMessage(
      isEditMode ? "Updating job post..." : "Creating job post..."
    );

    setProgress(0);

    // Simulate loading progress
    let value = 0;
    const interval = setInterval(() => {
      value += 20;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setLoadingMessage(
          isEditMode ? "Job updated successfully!" : "Job created successfully!"
        );

        resetForm();
        // Auto close after 1.5s (optional)
        setTimeout(() => setShowDialog(false), 1500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <FaArrowLeft
            onClick={() => router.back()}
            className="text-gray-700 text-2xl hover:text-gray-500 cursor-pointer transition"
          />

          <h1 className="text-4xl font-bold text-gray-900">
            {isEditMode ? "Edit Job" : "Add Job"}
          </h1>
        </div>

        {/* Description under title */}
        <p className="text-gray-600 mb-8 ml-10">
          {isEditMode
            ? "Update the details of this job posting."
            : "Enter the details to create a new job posting."}
        </p>

        <div className="bg-white text-gray-800 rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 space-y-10">
          {/* JOB INFORMATION */}
          <SectionTitle icon={<TbListDetails />} title="Job Information" />
          <div>
            <InputField
              label="Job Title"
              ref={titleRef}
              icon={<FaUserTie />}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              error={errors.title}
            />

            {/* Job Description */}
            <div className="mt-5">
              <Label icon={<FaClipboardList />} text="Job Description" />
              <textarea
                ref={descriptionRef}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full h-40 mt-2 p-4 border rounded-xl bg-gray-50 
  ${
    errors.description
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-400 focus:ring-indigo-400"
  }
  transition`}
                placeholder="Write a detailed job description..."
              ></textarea>

              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <SectionTitle icon={<IoMdSettings />} title="Job Settings" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* SALARY FIELD: Min / Max / Year */}
            <div className="flex flex-col">
              <Label icon={<FaRupeeSign />} text="Salary Range" />

              <div className="mt-2 flex items-center gap-3">
                {/* Min Salary */}
                <input
                  ref={salaryMinRef}
                  type="number"
                  placeholder="Min"
                  value={formData.salaryMin}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryMin: e.target.value })
                  }
                  className={`w-1/2 p-3 border rounded-xl bg-gray-50 
        ${
          errors.salaryMin
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-400 focus:ring-indigo-400"
        }`}
                />

                <span className="text-gray-600 font-medium">to</span>

                {/* Max Salary */}
                <input
                  type="number"
                  ref={salaryMaxRef}
                  placeholder="Max"
                  value={formData.salaryMax}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryMax: e.target.value })
                  }
                  className={`w-1/2 p-3 border rounded-xl bg-gray-50 
        ${
          errors.salaryMax
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-400 focus:ring-indigo-400"
        }`}
                />

                {/* /Year Label */}
                <span className="text-gray-700 font-medium whitespace-nowrap">
                  /Year
                </span>
              </div>

              {/* Error Messages */}
              {(errors.salaryMin || errors.salaryMax) && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.salaryMin || errors.salaryMax}
                </p>
              )}
            </div>

            <SelectField
              ref={workModeRef}
              label="Work Mode"
              icon={<BsBriefcaseFill />}
              options={["Onsite", "Remote", "Hybrid"]}
              value={formData.workMode}
              onChange={(e) =>
                setFormData({ ...formData, workMode: e.target.value })
              }
              // error={errors.workMode}
            />

            <SelectField
              ref={employmentRef}
              label="Employment Type"
              icon={<BsBriefcaseFill />}
              options={[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Freelance",
              ]}
              value={formData.employment}
              onChange={(e) =>
                setFormData({ ...formData, employment: e.target.value })
              }
              error={errors.employment}
            />

            <SelectField
              ref={experienceRef}
              label="Experience Level"
              icon={<IoTimerSharp />}
              options={["Fresher", " 1-3 Yrs", "3-5 Yrs", "5+ Yrs"]}
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              error={errors.experience}
            />
            <SelectField
              ref={locationRef}
              label="Location"
              icon={<FaMapMarkerAlt />}
              options={["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi"]}
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              error={errors.location}
            />

            <div className="flex flex-col">
              <Label icon={<FaCalendarAlt />} text="Application Deadline" />
              <input
                type="date"
                ref={deadlineRef}
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className={`mt-2 w-full px-3 py-2.5 border rounded-xl bg-gray-50 
  ${
    errors.deadline
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-400 focus:ring-indigo-400"
  }`}
              />

              {errors.deadline && (
                <p className="text-sm text-red-500">{errors.deadline}</p>
              )}
            </div>
          </div>

          {/* REQUIRED SKILLS */}
          <div className="mt-8" ref={skillsRef}>
            <SectionTitle icon={<PiListStarBold />} title="Required Skills" />

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Enter a skill and press enter"
              className={`w-full mb-4 p-3 border border-gray-400 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
              ${errors.skills ? "border-red-500" : "border-gray-100"}`}
            />

            {skills.length !== 0 && (
              <div className="max-h-40 overflow-y-auto p-3 border border-gray-100 rounded-lg bg-gray-50 shadow-inner">
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full border border-orange-300 text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Now show validation message OUTSIDE the block */}
            {errors.skills && (
              <p className="text-sm text-red-500 mt-1">{errors.skills}</p>
            )}
          </div>

          {/* ASSESSMENT SECTION */}
          <div className="mt-10">
            <SectionTitle icon={<MdAttachFile />} title="Assessment" />

            <div className="flex flex-col gap-5">
              {/* Assessment Title */}
              <div>
                <Label icon={<FaFilePen />} text="Assessment Title" />
                <input
                  ref={assessmentTitleRef}
                  type="text"
                  value={formData.assessmentTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assessmentTitle: e.target.value,
                    })
                  }
                  className={`w-full mt-2 p-3 border rounded-xl bg-gray-50 
        ${
          errors.assessmentTitle
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-400 focus:ring-indigo-400"
        }`}
                />

                {errors.assessmentTitle && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.assessmentTitle}
                  </p>
                )}
              </div>

              {/* Assessment File Upload */}
              {/* Assessment File Upload */}
              <div>
                <Label icon={<FaFileUpload />} text="Upload Assessment File" />

                {/* Hidden Native Input */}
                <input
                  ref={assessmentFileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  id="assessmentUpload"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assessmentFile: e.target.files?.[0] || null,
                    })
                  }
                />

                {/* Beautiful Dashed Upload Box */}
                <label
                  htmlFor="assessmentUpload"
                  className={`
      mt-3 w-full flex flex-col items-center justify-center 
      border-2 border-dashed rounded-xl cursor-pointer p-8
      transition bg-gray-50 
      ${
        errors.assessmentFile
          ? "border-red-400"
          : "border-gray-300 hover:bg-gray-100"
      }
    `}
                >
                  {/* Cloud Upload Icon */}
                  <div className="text-gray-500 mb-2 text-3xl">
                    <FaUpload />
                  </div>

                  {/* Upload Text */}
                  <p className="text-gray-700 font-medium">
                    {formData.assessmentFile
                      ? "Change selected file"
                      : "Choose a file"}
                  </p>

                  <p className="text-gray-400 text-sm">
                    PDF, DOC, JPG, PNG formats, up to 50MB
                  </p>

                  {/* Browse Button */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("assessmentUpload")?.click()
                    }
                    className=" cursor-pointer mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg 
      text-gray-700 font-medium shadow-sm hover:bg-gray-200 transition"
                  >
                    Browse File
                  </button>
                </label>

                {/* Selected File Chip */}
                {formData.assessmentFile && (
                  <div
                    className="
        mt-3 inline-flex items-center gap-2 
        bg-orange-100 text-orange-700 
        px-3 py-1.5 rounded-full text-sm font-medium
        border border-orange-300
      "
                  >
                    <FaFileUpload className="text-orange-600" />

                    <span className="truncate max-w-[150px]">
                      {formData.assessmentFile.name}
                    </span>

                    {/* Remove File */}
                    <button
                      onClick={() =>
                        setFormData({ ...formData, assessmentFile: null })
                      }
                      className="text-orange-700 hover:text-orange-900"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                )}

                {/* Error Message */}
                {errors.assessmentFile && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.assessmentFile}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* INTERNAL NOTES */}
          <div>
            <SectionTitle icon={<FaRegFileAlt />} title="Internal Notes" />

            <textarea
              className="w-full h-32 p-4 border border-gray-400 rounded-xl bg-gray-50  focus:ring-indigo-400"
              value={formData.internalNotes}
              onChange={(e) =>
                setFormData({ ...formData, internalNotes: e.target.value })
              }
              placeholder="Internal/reference notes..."
            ></textarea>

            <div className="flex gap-1 items-center px-5 py-3 text-sm text-yellow-500 mt-3 rounded-xl bg-yellow-50">
              <TbInfoOctagonFilled />
              <p>
                These notes are only for internal HR use and will not be visible
                to job applicants.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between items-center mt-8 flex-col sm:flex-row gap-4 sm:gap-0">
            <button
              onClick={() => router.back()}
              className="px-8 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-100 transition font-medium cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition font-semibold shadow cursor-pointer"
            >
              {isEditMode ? (
                <>
                  <IoMdCheckmarkCircleOutline className="text-lg font-semibold" />
                  Update Job Post
                </>
              ) : (
                <>
                  <FaPlus />
                  Create Job Post
                </>
              )}
            </button>
          </div>
          {/* Snackbar */}
          {showSnackbar && (
            <div className="fixed  flex items-center gap-2 w-80 p-4 top-5 right-5 z-50  bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
              <IoMdWarning /> Fill in all the required fields.
            </div>
          )}
        </div>
      </div>
      {/* DIALOG BACKDROP */}
      {showDialog && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-white w-80 pt-4 rounded-md shadow-lg border border-gray-200 animate-fadeIn">
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <FaBriefcase className="text-gray-600 text-md" />
              {/* Message */}
              <p className="text-md text-gray-600">{loadingMessage}</p>
            </div>

            {/* Linear Loader */}
            <div className="w-full h-2 bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- COMPONENTS (TypeScript) ---------- */

interface SelectProps {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, icon, options, value, onChange, error }, ref) => {
    return (
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <label className="text-gray-700 font-medium">{label}</label>
        </div>

        <select
          ref={ref}
          value={value}
          onChange={onChange}
          className={`w-full mt-2 p-3 border rounded-xl bg-gray-50 
            ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-400 focus:ring-indigo-400"
            }`}
        >
          <option value="">{`Select ${label}`}</option>

          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

interface LabelProps {
  text: string;
  icon?: React.ReactNode;
}
function Label({ icon, text }: LabelProps) {
  return (
    <label className="flex items-center gap-2 text-gray-700 font-medium">
      {icon}
      {text}
    </label>
  );
}

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, placeholder, value, onChange, error }, ref) => {
    return (
      <div className="w-full">
        <Label text={label} icon={icon} />
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full mt-2 p-3 border rounded-xl bg-gray-50
            ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-400 focus:ring-indigo-400"
            } transition`}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

// Required for forwardRef components
InputField.displayName = "InputField";

/* ---------- COMPONENTS (TypeScript) ---------- */

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
}

function SectionTitle({ title, icon }: SectionProps) {
  return (
    <div className="border-b pb-3 mb-5 flex items-center gap-2">
      {icon && (
        <span className="text-xl font-semibold text-gray-500">{icon}</span>
      )}
      <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
    </div>
  );
}
