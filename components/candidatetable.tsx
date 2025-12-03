import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  ChevronDown,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileText
} from 'lucide-react';

// --- Types & Interfaces ---

type StatusType = 'Hired' | 'Interviewing' | 'Applied' | 'Pending Review' | 'Rejected';

interface Candidate {
  id: string;
  name: string;
  avatarInitials: string;
  course: string;
  caddScore: number;
  skills: string[];
  status: StatusType;
}

// --- Mock Data Generator ---
const NAMES = ['Eleanor Vance', 'Marcus Thorne', 'Isabella Rossi', 'Julian Chen', 'Sophia Al-Jamil', 'Liam O\'Connor', 'Ava Patel', 'Noah Williams'];
const COURSES = ['Java Full Stack', 'Python Full Stack', 'Data Analytics', 'MERN Stack', 'DevOps Engineering', 'UI/UX Design'];
const STATUSES: StatusType[] = ['Hired', 'Interviewing', 'Applied', 'Pending Review', 'Rejected'];

const INITIAL_DATA: Candidate[] = Array.from({ length: 42 }, (_, i) => {
  const name = NAMES[i % NAMES.length];
  const initials = name.split(' ').map(n => n[0]).join('');
  const course = COURSES[i % COURSES.length];
  
  let skills: string[] = [];
  if (course.includes('Java')) skills = ['Java', 'Spring Boot', 'Hibernate', 'SQL', 'Git'];
  else if (course.includes('Python')) skills = ['Python', 'Django', 'Flask', 'PostgreSQL'];
  else if (course.includes('Data')) skills = ['Tableau', 'PowerBI', 'SQL'];
  else skills = ['React', 'Node.js', 'Express'];

  if (i % 3 === 0) skills.push('Docker');
  
  return {
    id: `ID-${84321 + i}`,
    name: `${name} ${Math.floor(i / NAMES.length) > 0 ? Math.floor(i / NAMES.length) + 1 : ''}`.trim(), 
    avatarInitials: initials,
    course: course,
    caddScore: 65 + (i * 7 % 35), 
    skills: skills,
    status: STATUSES[i % STATUSES.length],
  };
});

// --- Helper Components ---

const getSkillBadgeStyles = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('java') || s.includes('spring') || s.includes('hibernate') || s.includes('jsp') || s.includes('sql') || s.includes('git')) {
    return 'bg-blue-100 text-blue-700';
  }
  if (s.includes('python') || s.includes('django') || s.includes('flask') || s.includes('pandas') || s.includes('numpy')) {
    return 'bg-[#FEF3C7] text-[#92400E]';
  }
  if (s.includes('data') || s.includes('tableau') || s.includes('powerbi')) {
    return 'bg-indigo-100 text-indigo-700';
  }
  return 'bg-gray-100 text-gray-700';
};

const SkillBadge = ({ skill }: { skill: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 ${getSkillBadgeStyles(skill)}`}>
    {skill}
  </span>
);

// --- Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
             <button onClick={onClose} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};

// --- Hook for Click Outside ---
function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>, 
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

export default function CompanyCandidate() {
  // Data State
  const [data, setData] = useState<Candidate[]>(INITIAL_DATA);
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // UI State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'view' | 'download' | null;
    candidate: Candidate | null;
  }>({ isOpen: false, type: null, candidate: null });

  // Refs
const statusDropdownRef = useRef<HTMLDivElement | null>(null);
const courseDropdownRef = useRef<HTMLDivElement | null>(null);
const scoreDropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(statusDropdownRef, () => activeDropdown === 'status' && setActiveDropdown(null));
  useOnClickOutside(courseDropdownRef, () => activeDropdown === 'course' && setActiveDropdown(null));
  useOnClickOutside(scoreDropdownRef, () => activeDropdown === 'score' && setActiveDropdown(null));

  // --- Logic ---

  const filteredData = useMemo(() => {
    return data.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
      const matchesCourse = courseFilter === 'All' || candidate.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [data, searchQuery, statusFilter, courseFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      // @ts-ignore - simple dynamic sort handling
      const aValue = a[sortConfig.key];
      // @ts-ignore
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter, courseFilter]);

  // --- Handlers ---

  const handleSort = (key: keyof Candidate) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
    setActiveDropdown(null); 
  };

  const toggleDropdown = (name: string) => setActiveDropdown(activeDropdown === name ? null : name);

  const uniqueCourses = ['All', ...Array.from(new Set(INITIAL_DATA.map(c => c.course)))];
  const uniqueStatuses = ['All', ...STATUSES];

  return (
    <div className="p-6 bg-white min-h-screen flex justify-center font-sans text-gray-800">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in.fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
      <div className="w-full max-w-[1400px] bg-white flex flex-col min-h-[600px]">

        {/* --- Header Bar --- */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full xl:w-[450px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Candidates by skills, name, mobile..."
              className="block w-full pl-11 pr-3 py-3 rounded-lg bg-gray-50 border-none text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            
            {/* Status Filter */}
            <div className="relative" ref={statusDropdownRef}>
              <button onClick={() => toggleDropdown('status')} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-semibold text-sm transition-colors min-w-[100px]">
                Status <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === 'status' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {uniqueStatuses.map(status => (
                    <button key={status} onClick={() => { setStatusFilter(status); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                      {status} {statusFilter === status && <Check className="h-4 w-4 text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Courses Filter */}
            <div className="relative" ref={courseDropdownRef}>
              <button onClick={() => toggleDropdown('course')} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-semibold text-sm transition-colors min-w-[100px]">
                <span className="truncate max-w-[120px]">{courseFilter === 'All' ? 'Courses' : courseFilter}</span> <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === 'course' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {uniqueCourses.map(course => (
                    <button key={course} onClick={() => { setCourseFilter(course); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                      <span className="truncate">{course}</span> {courseFilter === course && <Check className="h-4 w-4 text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CADD Score Filter */}
            <div className="relative" ref={scoreDropdownRef}>
              <button onClick={() => toggleDropdown('score')} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-semibold text-sm transition-colors min-w-[120px]">
                CADD Score <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === 'score' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                   <button onClick={() => handleSort('caddScore')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                     <ArrowUp className="h-4 w-4" /> Low to High {sortConfig.key === 'caddScore' && sortConfig.direction === 'asc' && <Check className="h-4 w-4 text-orange-500 ml-auto" />}
                  </button>
                  <button onClick={() => { setSortConfig({ key: 'caddScore', direction: 'desc' }); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                     <ArrowDown className="h-4 w-4" /> High to Low {sortConfig.key === 'caddScore' && sortConfig.direction === 'desc' && <Check className="h-4 w-4 text-orange-500 ml-auto" />}
                  </button>
                </div>
              )}
            </div>

            {/* Apply Filters (Orange) */}
            <button className="px-6 py-3 bg-[#F97316] hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">
              Apply Filters
            </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-x-auto flex-grow border-t border-gray-100">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer group" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">NAME <ArrowUpDown className={`h-3 w-3 ${sortConfig.key === 'name' ? 'text-orange-500' : 'text-gray-300 group-hover:text-gray-400'}`} /></div>
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">COURSES</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer group" onClick={() => handleSort('caddScore')}>
                  <div className="flex items-center gap-1">CADD SCORE <ArrowUpDown className={`h-3 w-3 ${sortConfig.key === 'caddScore' ? 'text-orange-500' : 'text-gray-300 group-hover:text-gray-400'}`} /></div>
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider w-[350px]">SKILLSET</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((candidate) => {
                  const visibleSkills = candidate.skills.slice(0, 4);
                  const remainingSkillsCount = candidate.skills.length - 4;

                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
                            {candidate.avatarInitials}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{candidate.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{candidate.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{candidate.course}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600">{candidate.caddScore}%</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap items-center">
                          {visibleSkills.map(skill => <SkillBadge key={skill} skill={skill} />)}
                          {remainingSkillsCount > 0 && <span className="text-xs font-bold text-orange-500 mb-2 ml-1">+{remainingSkillsCount} more</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-4">
                            <button onClick={() => setModalState({ isOpen: true, type: 'view', candidate })} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Eye size={20} />
                            </button>
                            <button 
                                onClick={() => setModalState({ isOpen: true, type: 'download', candidate })}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                            >
                                <Download size={16} /> Resume
                            </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <p>No candidates found matching your filters.</p>
                    <button onClick={() => { setStatusFilter('All'); setCourseFilter('All'); setSearchQuery(''); }} className="mt-2 text-orange-500 hover:text-orange-600 font-medium">Clear all filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Footer & Pagination --- */}
        <div className="px-6 py-6 flex items-center justify-between border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{paginatedData.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span> of <span className="font-bold text-gray-900">{sortedData.length}</span> results
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) p = currentPage - 2 + i;
                    if (p > totalPages) p = totalPages - (4 - i);
                    if (p < 1) p = 1;
                  }
                  
                  return (
                    <button key={p} onClick={() => setCurrentPage(p)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors font-bold text-sm ${currentPage === p ? 'bg-[#F97316] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
                      {p}
                    </button>
                  );
              })}
            </div>

            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Active Modal Rendering --- */}
      {modalState.isOpen && modalState.candidate && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, type: null, candidate: null })}
          title={modalState.type === 'view' ? 'Candidate Profile' : 'Download Resume'}
        >
           <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                   <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl">
                      {modalState.candidate.avatarInitials}
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-gray-900">{modalState.candidate.name}</h4>
                      <p className="text-gray-500">{modalState.candidate.id}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {modalState.candidate.course}
                      </div>
                   </div>
                </div>
                {modalState.type === 'download' && (
                  <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                    <FileText size={32} className="text-orange-300 mx-auto mb-2" />
                     <p className="text-sm text-gray-600">Preparing download for...</p>
                     <p className="text-sm font-semibold text-gray-900">resume_{modalState.candidate.id}.pdf</p>
                  </div>
                )}
           </div>
        </Modal>
      )}

    </div>
  );
}