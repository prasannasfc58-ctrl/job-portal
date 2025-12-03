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

// --- Skill Badge Helper ---

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

// --- FIXED HOOK (No More TypeScript Error) ---
// ✅ Accept null safely
function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // if ref not mounted OR click is inside → do nothing
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
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
  const [data] = useState<Candidate[]>(INITIAL_DATA);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'view' | 'download' | null;
    candidate: Candidate | null;
  }>({ isOpen: false, type: null, candidate: null });


  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
const courseDropdownRef = useRef<HTMLDivElement | null>(null);
const scoreDropdownRef = useRef<HTMLDivElement | null>(null);

useOnClickOutside(statusDropdownRef, () => {
  if (activeDropdown === "status") setActiveDropdown(null);
});

useOnClickOutside(courseDropdownRef, () => {
  if (activeDropdown === "course") setActiveDropdown(null);
});

useOnClickOutside(scoreDropdownRef, () => {
  if (activeDropdown === "score") setActiveDropdown(null);
});


  // --- Filters & Sorting Logic ---
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
      //@ts-ignore
      const aValue = a[sortConfig.key];
      //@ts-ignore
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

        {/* SEARCH + FILTER BAR */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">

          <div className="relative w-full xl:w-[450px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Candidates by skills, name, mobile..."
              className="block w-full pl-11 pr-3 py-3 rounded-lg bg-gray-50 border-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">

            {/* STATUS FILTER */}
            <div className="relative" ref={statusDropdownRef}>
              <button onClick={() => toggleDropdown('status')} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg min-w-[100px]">
                Status <ChevronDown className="h-4 w-4 ml-2" />
              </button>

              {activeDropdown === 'status' && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-1 z-50">
                  {uniqueStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setActiveDropdown(null); }}
                      className="w-full px-4 py-2 text-left text-sm flex justify-between"
                    >
                      {status}
                      {statusFilter === status && <Check className="h-4 w-4 text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COURSE FILTER */}
            <div className="relative" ref={courseDropdownRef}>
              <button onClick={() => toggleDropdown('course')} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg min-w-[100px]">
                {courseFilter === 'All' ? 'Courses' : courseFilter}
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>

              {activeDropdown === 'course' && (
                <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg border py-1 z-50">
                  {uniqueCourses.map(course => (
                    <button
                      key={course}
                      onClick={() => { setCourseFilter(course); setActiveDropdown(null); }}
                      className="w-full px-4 py-2 text-left text-sm flex justify-between"
                    >
                      {course}
                      {courseFilter === course && <Check className="h-4 w-4 text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SCORE FILTER */}
            <div className="relative" ref={scoreDropdownRef}>
              <button onClick={() => toggleDropdown('score')} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg min-w-[120px]">
                CADD Score <ChevronDown className="h-4 w-4 ml-2" />
              </button>

              {activeDropdown === 'score' && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-1 z-50">
                  <button onClick={() => handleSort('caddScore')} className="w-full px-4 py-2 flex gap-2 text-sm">
                    <ArrowUp className="h-4 w-4" /> Low to High
                  </button>

                  <button onClick={() => { setSortConfig({ key: 'caddScore', direction: 'desc' }); setActiveDropdown(null); }} className="w-full px-4 py-2 flex gap-2 text-sm">
                    <ArrowDown className="h-4 w-4" /> High to Low
                  </button>
                </div>
              )}
            </div>

            <button className="px-6 py-3 bg-[#F97316] text-white rounded-lg font-semibold shadow-sm">
              Apply Filters
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-grow border-t border-gray-100">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="px-6 py-5 text-xs font-bold cursor-pointer">
                  <div className="flex items-center gap-1">
                    NAME <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-5 text-xs font-bold">COURSES</th>
                <th onClick={() => handleSort('caddScore')} className="px-6 py-5 text-xs font-bold cursor-pointer">
                  <div className="flex items-center gap-1">
                    CADD SCORE <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-5 text-xs font-bold w-[350px]">SKILLSET</th>
                <th className="px-6 py-5 text-xs font-bold text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedData.length > 0 ? (
                paginatedData.map((candidate) => {
                  const visibleSkills = candidate.skills.slice(0, 4);
                  const remainingSkillsCount = candidate.skills.length - 4;

                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                            {candidate.avatarInitials}
                          </div>
                          <div className="ml-4">
                            <div className="font-bold">{candidate.name}</div>
                            <div className="text-xs text-gray-400">{candidate.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">{candidate.course}</td>

                      <td className="px-6 py-5 font-medium">{candidate.caddScore}%</td>

                      <td className="px-6 py-5">
                        <div className="flex flex-wrap">
                          {visibleSkills.map(skill => (
                            <SkillBadge key={skill} skill={skill} />
                          ))}
                          {remainingSkillsCount > 0 && (
                            <span className="text-xs font-bold text-orange-500">
                              +{remainingSkillsCount} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button onClick={() => setModalState({ isOpen: true, type: 'view', candidate })} className="text-gray-400 hover:text-gray-600">
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-6 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing {paginatedData.length ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 bg-gray-100 rounded-lg disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3) p = currentPage - 2 + i;
                if (p > totalPages) p = totalPages - (4 - i);
                if (p < 1) p = 1;
              }
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-9 h-9 rounded-lg ${currentPage === p ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  {p}
                </button>
              );
            })}

            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 bg-gray-100 rounded-lg disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* MODAL */}
      {modalState.isOpen && modalState.candidate && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, type: null, candidate: null })}
          title="Candidate Profile"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl">
                {modalState.candidate.avatarInitials}
              </div>
              <div>
                <h4 className="text-lg font-bold">{modalState.candidate.name}</h4>
                <p className="text-gray-500">{modalState.candidate.id}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
