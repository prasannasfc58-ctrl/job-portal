"use client"
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  Calendar,
  Send,
  Save
} from 'lucide-react';

// --- Types & Interfaces ---

type JobStatus = 'Published' | 'Draft' | 'Closed' | 'On Hold';
type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: JobType;
  status: JobStatus;
  deadline: string;
  applicants: number;
  // Extra fields for the form
  description?: string;
  experienceLevel?: string;
  skills?: string[];
  notes?: string;
}

// --- Mock Data ---

const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'JOB-101',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Published',
    deadline: '2024-08-15',
    applicants: 42,
    description: 'We are looking for an experienced Frontend Developer...',
    skills: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'JOB-102',
    title: 'Product Manager',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'Draft',
    deadline: '2024-09-01',
    applicants: 0,
    skills: ['Agile', 'Jira', 'Product Strategy'],
  },
  {
    id: 'JOB-103',
    title: 'UX/UI Designer',
    location: 'Remote',
    type: 'Contract',
    status: 'Closed',
    deadline: '2024-07-30',
    applicants: 153,
    skills: ['Figma', 'Sketch', 'Prototyping'],
  },
  {
    id: 'JOB-104',
    title: 'Data Scientist',
    location: 'Austin, TX',
    type: 'Full-time',
    status: 'On Hold',
    deadline: '2024-08-10',
    applicants: 25,
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: 'JOB-105',
    title: 'DevOps Engineer',
    location: 'Chicago, IL',
    type: 'Part-time',
    status: 'Published',
    deadline: '2024-08-20',
    applicants: 18,
    skills: ['AWS', 'Docker', 'Kubernetes'],
  },
  { id: 'JOB-106', title: 'Marketing Specialist', location: 'London, UK', type: 'Full-time', status: 'Published', deadline: '2024-08-25', applicants: 67 },
  { id: 'JOB-107', title: 'Sales Representative', location: 'Miami, FL', type: 'Full-time', status: 'Draft', deadline: '2024-09-05', applicants: 0 },
];

// --- Helper Components ---

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const styles: Record<JobStatus, string> = {
    'Published': 'bg-green-100 text-green-700 border border-green-200',
    'Draft': 'bg-gray-100 text-gray-700 border border-gray-200',
    'Closed': 'bg-red-100 text-red-700 border border-red-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- Form Components ---

interface CreateJobFormProps {
  onClose: () => void;
  onSave: (job: JobPosting) => void;
  initialData?: JobPosting | null;
}

const CreateJobForm = ({ onClose, onSave, initialData }: CreateJobFormProps) => {
  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [type, setType] = useState<JobType>(initialData?.type || 'Full-time');
  const [status, setStatus] = useState<JobStatus>(initialData?.status || 'Draft'); // State for status editing
  const [experienceLevel, setExperienceLevel] = useState(initialData?.experienceLevel || 'Entry-level');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [skills, setSkills] = useState<string[]>(initialData?.skills || ['JavaScript', 'React', 'Tailwind CSS']);
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  // Local UI State
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Status is optional here because if we are in Edit mode, we use the state `status`.
  // If we are in Create mode, the buttons determine the status ('Draft' or 'Published').
  const handleSave = (targetStatus?: JobStatus) => {
    // Basic Validation
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Job title is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalStatus = targetStatus || status;

    const jobData: JobPosting = {
      id: initialData?.id || `JOB-${Math.floor(Math.random() * 10000)}`,
      title,
      location,
      type,
      status: finalStatus,
      deadline,
      applicants: initialData?.applicants || 0,
      description,
      experienceLevel,
      skills,
      notes
    };

    onSave(jobData);
  };

  return (
    <div className="flex flex-col h-full">
       {/* Form Body - Scrollable */}
       <div className="flex-grow overflow-y-auto px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Job Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => { setTitle(e.target.value); if(errors.title) setErrors({...errors, title: ''}) }}
                placeholder="e.g., Senior Frontend Developer" 
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'} focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => { setLocation(e.target.value); if(errors.location) setErrors({...errors, location: ''}) }}
                placeholder="e.g., San Francisco, CA or Remote" 
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.location ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'} focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm`}
              />
               {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Job Description</label>
            <textarea 
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..." 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm resize-none"
            />
          </div>

          <div className={`grid grid-cols-1 ${initialData ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 mb-6`}>
             {/* Only show Status dropdown if editing existing job */}
            {initialData && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Status</label>
                <div className="relative">
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JobStatus)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm appearance-none font-medium text-gray-700 cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            )}

            <div className={initialData ? 'md:col-span-1' : ''}>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Employment Type</label>
              <div className="relative">
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm appearance-none font-medium text-gray-700 cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Experience Level</label>
              <div className="relative">
                <select 
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm appearance-none font-medium text-gray-700 cursor-pointer"
                >
                  <option>Entry-level</option>
                  <option>Mid-level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Application Deadline</label>
              <div className="relative">
                <input 
                  type="date"
                  value={deadline}
                  onChange={(e) => { setDeadline(e.target.value); if(errors.deadline) setErrors({...errors, deadline: ''}) }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.deadline ? 'border-red-300 focus:border-red-500' : 'bg-gray-50 border-transparent hover:bg-gray-100 focus:bg-white focus:border-orange-500'} focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm text-gray-600 font-medium`}
                />
                 {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
              </div>
            </div>
          </div>

          <div className="mb-6">
             <label className="block text-xs font-bold text-gray-700 mb-1.5">Required Skills</label>
             <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all bg-white min-h-[46px]">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-medium border border-orange-100">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-orange-900"><X size={12} /></button>
                  </span>
                ))}
                <input 
                  type="text" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder={skills.length === 0 ? "Add a skill..." : ""}
                  className="flex-grow min-w-[100px] outline-none text-sm bg-transparent"
                />
             </div>
             <p className="text-xs text-gray-400 mt-1.5">Enter skills and press Enter to add them.</p>
          </div>

          <div className="mb-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Company-Specific Notes</label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes about this position..." 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm resize-none"
            />
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
               <Eye size={12} />
               <span>These notes are for internal use only and will not be visible to applicants.</span>
            </div>
          </div>
       </div>

       {/* Form Footer - Fixed at bottom */}
       <div className="pt-6 mt-2 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-colors">
            Cancel
          </button>
          
          {initialData ? (
             <button 
               onClick={() => handleSave()}
               className="px-4 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
             >
                <Save size={16} /> Update Job
             </button>
          ) : (
             <>
               <button 
                onClick={() => handleSave('Draft')}
                className="px-4 py-2.5 bg-[#FFF7ED] hover:bg-orange-50 text-orange-700 border border-orange-200 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                Save Draft
              </button>
              <button 
                onClick={() => handleSave('Published')}
                className="px-4 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                 <Send size={16} /> Post Job
              </button>
             </>
          )}
       </div>
    </div>
  );
};


// --- Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  isDanger?: boolean;
  maxWidth?: string;
}

const Modal = ({ isOpen, onClose, title, subtitle, children, actions, isDanger, maxWidth = 'max-w-md' }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} flex flex-col max-h-[90vh] overflow-hidden transform transition-all scale-100`}>
        {/* Header */}
        <div className={`px-6 py-5 border-b ${isDanger ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'} flex items-start justify-between shrink-0`}>
          <div>
            <h3 className={`text-xl font-bold ${isDanger ? 'text-red-800' : 'text-gray-900'}`}>{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer (Optional - used for simple modals, custom forms have their own footer) */}
        {actions && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Hook for Click Outside ---
function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}


// --- Main Component ---

export default function JobPosting() {
  const [data, setData] = useState<JobPosting[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Modal State
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'delete' | 'view' | 'edit' | 'add' | 'bulk-delete' | null;
    job: JobPosting | null;
  }>({ isOpen: false, type: null, job: null });

  // Refs
  const statusRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(statusRef, () => activeDropdown === 'status' && setActiveDropdown(null));
  useOnClickOutside(locationRef, () => activeDropdown === 'location' && setActiveDropdown(null));
  useOnClickOutside(typeRef, () => activeDropdown === 'type' && setActiveDropdown(null));

  // --- Logic ---

  const filteredData = useMemo(() => {
    return data.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const matchesLocation = locationFilter === 'All' || job.location.includes(locationFilter);
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesLocation && matchesType;
    });
  }, [data, searchQuery, statusFilter, locationFilter, typeFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(j => selectedIds.has(j.id));

  const uniqueStatuses = ['All', 'Published', 'Draft', 'Closed', 'On Hold'];
  const uniqueLocations = ['All', 'San Francisco', 'New York', 'Remote', 'Austin', 'Chicago'];
  const uniqueTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

  // --- Handlers ---

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newIds = new Set(selectedIds);
      paginatedData.forEach(j => newIds.add(j.id));
      setSelectedIds(newIds);
    } else {
      const newIds = new Set(selectedIds);
      paginatedData.forEach(j => newIds.delete(j.id));
      setSelectedIds(newIds);
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleDelete = () => {
    if (modal.job) {
      setData(prev => prev.filter(j => j.id !== modal.job!.id));
      setModal({ isOpen: false, type: null, job: null });
    }
  };

  const handleBulkDelete = () => {
    setData(prev => prev.filter(j => !selectedIds.has(j.id)));
    setSelectedIds(new Set());
    setModal({ isOpen: false, type: null, job: null });
  };

  const handleSaveJob = (job: JobPosting) => {
    const isEditing = data.some(j => j.id === job.id);
    if (isEditing) {
      setData(prev => prev.map(j => (j.id === job.id ? job : j)));
    } else {
      setData(prev => [job, ...prev]);
    }
    setModal({ isOpen: false, type: null, job: null });
  };

  const toggleDropdown = (name: string) => setActiveDropdown(activeDropdown === name ? null : name);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800 flex justify-center">
      <div className="w-full max-w-6xl">
        
        {/* --- Top Header --- */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Job Postings</h1>
          <div className="flex gap-3">
            {selectedIds.size > 0 && (
              <button 
                onClick={() => setModal({ isOpen: true, type: 'bulk-delete', job: null })}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                <Trash2 size={18} /> Delete ({selectedIds.size})
              </button>
            )}
            <button 
              onClick={() => setModal({ isOpen: true, type: 'add', job: null })}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
            >
              <Plus size={18} /> Add New Job
            </button>
          </div>
        </div>

        {/* --- Main Card --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* --- Filters Bar --- */}
          <div className="p-5 flex flex-col md:flex-row gap-4 border-b border-gray-100 bg-white">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by job title, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border-none rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <div className="relative" ref={statusRef}>
                <button onClick={() => toggleDropdown('status')} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-medium text-sm transition-colors min-w-[100px]">
                  {statusFilter === 'All' ? 'Status' : statusFilter} <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                </button>
                {activeDropdown === 'status' && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                    {uniqueStatuses.map(s => (
                      <button key={s} onClick={() => { setStatusFilter(s); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">{s}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Filter */}
              <div className="relative" ref={locationRef}>
                <button onClick={() => toggleDropdown('location')} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-medium text-sm transition-colors min-w-[110px]">
                  {locationFilter === 'All' ? 'Location' : locationFilter} <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                </button>
                {activeDropdown === 'location' && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                    {uniqueLocations.map(l => (
                      <button key={l} onClick={() => { setLocationFilter(l); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">{l}</button>
                    ))}
                  </div>
                )}
              </div>

               {/* Type Filter */}
               <div className="relative" ref={typeRef}>
                <button onClick={() => toggleDropdown('type')} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-medium text-sm transition-colors min-w-[90px]">
                  {typeFilter === 'All' ? 'Type' : typeFilter} <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                </button>
                {activeDropdown === 'type' && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                    {uniqueTypes.map(t => (
                      <button key={t} onClick={() => { setTypeFilter(t); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">{t}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Table --- */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/50 cursor-pointer"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Application Deadline</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-6 py-5">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/50 cursor-pointer"
                        checked={selectedIds.has(job.id)}
                        onChange={() => handleSelectOne(job.id)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        {job.location} <span className="text-gray-300">|</span> {job.type}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {job.deadline}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium pl-10">
                      {job.applicants}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      {/* Actions always visible */}
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => setModal({ isOpen: true, type: 'view', job })} className="text-gray-400 hover:text-gray-600 transition-colors" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => setModal({ isOpen: true, type: 'edit', job })} className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit Job">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => setModal({ isOpen: true, type: 'delete', job })} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Job">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                   <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                       No jobs found matching your criteria.
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination --- */}
          <div className="px-6 py-5 flex items-center justify-between border-t border-gray-100 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{paginatedData.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-gray-900">{filteredData.length}</span> results
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              
              {[1, 2, 3].map(page => (
                 <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === page ? 'bg-[#F97316] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">9</button>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- Modals --- */}
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          onClose={() => setModal({ isOpen: false, type: null, job: null })}
          title={
            modal.type === 'delete' ? 'Delete Job Posting' :
            modal.type === 'bulk-delete' ? 'Delete Selected Jobs' :
            modal.type === 'view' ? 'Job Details' :
            modal.type === 'edit' ? 'Edit Job' : 
            modal.type === 'add' ? 'Create a New Job Posting' : ''
          }
          subtitle={modal.type === 'add' || modal.type === 'edit' ? 'Fill out the details below to post a new job opening.' : undefined}
          isDanger={modal.type === 'delete' || modal.type === 'bulk-delete'}
          maxWidth={modal.type === 'add' || modal.type === 'edit' || modal.type === 'view' ? 'max-w-4xl' : 'max-w-md'} 
          actions={
            // Custom footer for 'add'/'edit' is inside CreateJobForm
            (modal.type === 'add' || modal.type === 'edit') ? null :
            (modal.type === 'delete' || modal.type === 'bulk-delete') ? (
              <>
                 <button onClick={() => setModal({ isOpen: false, type: null, job: null })} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                 <button onClick={modal.type === 'bulk-delete' ? handleBulkDelete : handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm">Delete</button>
              </>
             ) : (
              <button onClick={() => setModal({ isOpen: false, type: null, job: null })} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors shadow-sm">Close</button>
             )
          }
        >
           {(modal.type === 'delete' || modal.type === 'bulk-delete') ? (
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-red-100 text-red-600 rounded-full shrink-0">
                    <AlertCircle size={24} />
                 </div>
                 <div>
                    <p className="font-semibold text-gray-900 text-lg">Are you sure?</p>
                    <p className="text-gray-600 mt-1">
                      {modal.type === 'bulk-delete' 
                        ? `This will permanently delete ${selectedIds.size} selected job postings.` 
                        : <>This will permanently delete the posting for <span className="font-bold">{modal.job?.title}</span>.</>
                      }
                      {" "}This action cannot be undone.
                    </p>
                 </div>
              </div>
           ) : modal.type === 'view' && modal.job ? (
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Title</label>
                    <p className="text-lg font-bold text-gray-900">{modal.job.title}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Location</label>
                        <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                            <MapPin size={16} /> {modal.job.location}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Type</label>
                        <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                            <Briefcase size={16} /> {modal.job.type}
                        </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                        <StatusBadge status={modal.job.status} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Deadline</label>
                         <div className="flex items-center gap-2 text-gray-700">
                            <Clock size={16} /> {modal.job.deadline}
                        </div>
                    </div>
                 </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {modal.job.description || "No description provided."}
                    </p>
                 </div>
                 {modal.job.skills && modal.job.skills.length > 0 && (
                     <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Required Skills</label>
                        <div className="flex flex-wrap gap-2">
                            {modal.job.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-medium border border-orange-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                 )}
              </div>
           ) : (modal.type === 'add' || modal.type === 'edit') ? (
              <CreateJobForm 
                onClose={() => setModal({ isOpen: false, type: null, job: null })} 
                onSave={handleSaveJob}
                initialData={modal.job}
              />
           ) : null}
        </Modal>
      )}

    </div>
  );
}