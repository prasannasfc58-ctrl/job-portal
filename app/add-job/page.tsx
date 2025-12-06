"use client";
import { 
  Pencil, MapPin, Briefcase, Signal, Calendar, Code, 
  X, FileText, Info, Save, ArrowLeft 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditJobForm() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/company");
  };

  const handleUpdate = () => {
    const confirmPost = window.confirm("Are you sure you want to update this job?");
    if (!confirmPost) return;

    alert("Job posted successfully!");
    router.push("/company");
  };

  const handleBack = () => {
    router.push("/company");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white font-display text-gray-800">

      {/* Back Arrow */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="max-w-4xl w-full mx-auto space-y-8">
        {/* Header */}
     <div>
  <h1 className="text-4xl font-bold text-gray-900">Add Job</h1>
  <p className="mt-2 text-lg text-gray-600">
    Enter the details to create a new job posting.
  </p>
</div>


        <div className="space-y-6">
          {/* Job Information */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label
                  htmlFor="job-title"
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <Pencil className="h-4 w-4 mr-2 text-gray-400" />
                  Job Title
                </label>
                <input
                  id="job-title"
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                  defaultValue="Senior Frontend Developer"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                  defaultValue="San Francisco, CA"
                />
              </div>

              {/* Job Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="job-description"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                  defaultValue="We are looking for an experienced Frontend Developer..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Job Settings */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">
              Job Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  Employment Type
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Signal className="h-4 w-4 mr-2 text-gray-400" />
                  Experience Level
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <option>Entry-level</option>
                  <option>Mid-level</option>
                  <option>Senior</option>
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Application Deadline
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="15-08-2024"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-3"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-6 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Required Skills
            </h2>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {["React", "TypeScript", "Tailwind"].map((skill) => (
                <span
                  key={skill}
                  className="flex items-center bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {skill}
                  <button className="ml-2 text-orange-500 hover:text-orange-700">
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
              placeholder="Enter skills and press Enter to add them"
            />
          </div>

          {/* Internal Notes */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-6 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Internal Notes
            </h2>

            <textarea
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
              placeholder="Internal notes about this position..."
            ></textarea>

            <p className="mt-3 flex items-center text-xs text-gray-500">
              <Info className="h-4 w-4 mr-2" />
              These notes are for internal use only and will not be visible to applicants.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end pt-6">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg mr-4 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-orange-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
}
