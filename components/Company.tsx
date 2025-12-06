import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  ChevronDown,
  Eye,
  Download,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Check,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
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
const NAMES = ['Eleanor Vance', 'Marcus Thorne', 'Isabella Rossi', 'Julian Chen', 'Sophia Al-Jamil', 'Liam O\'Connor', 'Ava Patel', 'Noah Williams', 'Emma Rodriguez', 'James Smith', 'Olivia Johnson', 'William Brown', 'Mia Jones', 'Benjamin Garcia', 'Charlotte Miller', 'Lucas Davis', 'Amelia Rodriguez', 'Mason Martinez', 'Harper Hernandez', 'Evelyn Lopez'];
const COURSES = ['Java Full Stack', 'Python Full Stack', 'Data Analytics', 'MERN Stack', 'DevOps Engineering', 'UI/UX Design'];
const STATUSES: StatusType[] = ['Hired', 'Interviewing', 'Applied', 'Pending Review', 'Rejected'];
const SKILLS_POOL = ['Java', 'Spring Boot', 'Hibernate', 'SQL', 'Git', 'Docker', 'K8s', 'Python', 'Django', 'Flask', 'PostgreSQL', 'Tableau', 'PowerBI', 'Pandas', 'NumPy', 'React', 'Node.js', 'AWS', 'Terraform'];

const generateMockData = (count: number): Candidate[] => {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[i % NAMES.length];
    const initials = name.split(' ').map(n => n[0]).join('');
    const course = COURSES[i % COURSES.length];
    const status = STATUSES[i % STATUSES.length];
    const skillCount = 3 + (i % 5);
    const skills = SKILLS_POOL.slice(i % 5, (i % 5) + skillCount);
    
    return {
      id: `ID-${84321 + i}`,
      name: `${name} ${Math.floor(i / NAMES.length) + 1}`, 
      avatarInitials: initials,
      course: course,
      caddScore: 60 + (i * 7 % 40), 
      skills: skills,
      status: status,
    };
  });
};

const INITIAL_DATA = generateMockData(42); 

// --- Helper Components ---

const getSkillBadgeStyles = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('java') || s.includes('spring') || s.includes('hibernate') || s.includes('jsp')) return 'bg-blue-100 text-blue-700';
  if (s.includes('python') || s.includes('django') || s.includes('flask') || s.includes('pandas') || s.includes('numpy')) return 'bg-yellow-100 text-yellow-800';
  if (s.includes('data') || s.includes('tableau') || s.includes('powerbi') || s.includes('sql')) return 'bg-indigo-100 text-indigo-700';
  if (s.includes('react') || s.includes('node') || s.includes('mern')) return 'bg-teal-100 text-teal-700';
  return 'bg-gray-100 text-gray-700';
};

const SkillBadge = ({ skill }: { skill: string }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mr-2 mb-2 ${getSkillBadgeStyles(skill)}`}>
    {skill}
  </span>
);

const StatusBadge = ({ status }: { status: StatusType }) => {
  const statusStyles: Record<StatusType, string> = {
    'Hired': 'bg-green-100 text-green-700',
    'Interviewing': 'bg-sky-100 text-sky-700',
    'Applied': 'bg-blue-100 text-blue-700',
    'Pending Review': 'bg-orange-100 text-orange-700',
    'Rejected': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const ActionButton = ({ icon: Icon, onClick }: { icon: React.ElementType, onClick?: () => void }) => (
  <button onClick={(e) => { e.stopPropagation(); onClick?.(); }} className="text-gray-400 hover:text-blue-600 p-1 transition-colors">
    <Icon size={18} />
  </button>
);

// --- Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  type?: 'default' | 'danger';
}

const Modal = ({ isOpen, onClose, title, children, actions, type = 'default' }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">
        <div className={`p-6 border-b ${type === 'danger' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'} flex items-center justify-between`}>
          <h3 className={`text-lg font-bold ${type === 'danger' ? 'text-red-700' : 'text-gray-900'}`}>{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          {actions}
        </div>
      </div>
    </div>
  );
};

// --- Hook for Click Outside ---
// --- Hook for Click Outside ---
function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;
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

export default function CandidateTableWidget() {
  // Data State
  const [data, setData] = useState<Candidate[]>(INITIAL_DATA);
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // UI State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'delete' | 'view' | 'edit' | 'download' | null;
    candidate: Candidate | null;
  }>({ isOpen: false, type: null, candidate: null });

  // Dropdown Refs
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const courseDropdownRef = useRef<HTMLDivElement>(null);
  const scoreDropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(statusDropdownRef, () => activeDropdown === 'status' && setActiveDropdown(null));
  useOnClickOutside(courseDropdownRef, () => activeDropdown === 'course' && setActiveDropdown(null));
  useOnClickOutside(scoreDropdownRef, () => activeDropdown === 'score' && setActiveDropdown(null));

  // --- Logic ---

  const filteredData = useMemo(() => {
    return data.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.course.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
      const matchesCourse = courseFilter === 'All' || candidate.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [data, searchQuery, statusFilter, courseFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

 useEffect(() => {
  // Only update if currentPage is not already 1
  if (currentPage !== 1) {
    setTimeout(() => setCurrentPage(1), 0);
  }
}, [searchQuery, statusFilter, courseFilter]);


  // --- Handlers ---

  const openModal = (type: 'delete' | 'view' | 'edit' | 'download', candidate: Candidate) => {
    setModalState({ isOpen: true, type, candidate });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, candidate: null });
  };

  const confirmDelete = () => {
    if (modalState.candidate) {
      setData(prev => prev.filter(c => c.id !== modalState.candidate!.id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(modalState.candidate!.id);
        return newSet;
      });
      closeModal();
    }
  };

  const handleSort = (key: keyof Candidate) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setActiveDropdown(null); 
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newIds = new Set(selectedIds);
      paginatedData.forEach(c => newIds.add(c.id));
      setSelectedIds(newIds);
    } else {
      const newIds = new Set(selectedIds);
      paginatedData.forEach(c => newIds.delete(c.id));
      setSelectedIds(newIds);
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(c => selectedIds.has(c.id));

  const uniqueCourses = ['All', ...Array.from(new Set(INITIAL_DATA.map(c => c.course)))];
  const uniqueStatuses = ['All', ...STATUSES];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[600px]">

        {/* --- Header --- */}
        <div className="p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border-b border-gray-100 z-20">
          <div className="relative w-full xl:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates by name, ID, or course..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            
            {/* Status Filter */}
            <div className="relative" ref={statusDropdownRef}>
              <button 
                onClick={() => toggleDropdown('status')}
                className={`flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border ${statusFilter !== 'All' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700'} rounded-lg font-medium text-sm transition-colors`}
              >
                Status: {statusFilter}
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === 'status' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {uniqueStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setActiveDropdown(null); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    >
                      {status}
                      {statusFilter === status && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Course Filter */}
            <div className="relative" ref={courseDropdownRef}>
              <button 
                onClick={() => toggleDropdown('course')}
                className={`flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border ${courseFilter !== 'All' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700'} rounded-lg font-medium text-sm transition-colors`}
              >
                <span className="truncate max-w-[100px]">{courseFilter === 'All' ? 'Courses' : courseFilter}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === 'course' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {uniqueCourses.map(course => (
                    <button
                      key={course}
                      onClick={() => { setCourseFilter(course); setActiveDropdown(null); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="truncate">{course}</span>
                      {courseFilter === course && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Score Sort */}
            <div className="relative" ref={scoreDropdownRef}>
              <button 
                onClick={() => toggleDropdown('score')}
                className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm transition-colors"
              >
                CADD Score
                <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
              </button>
              {activeDropdown === 'score' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Sort By Score</div>
                  <button onClick={() => handleSort('caddScore')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                     <ArrowUp className="h-4 w-4" /> Low to High
                     {sortConfig.key === 'caddScore' && sortConfig.direction === 'asc' && <Check className="h-4 w-4 text-blue-600 ml-auto" />}
                  </button>
                  <button onClick={() => { setSortConfig({ key: 'caddScore', direction: 'desc' }); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                     <ArrowDown className="h-4 w-4" /> High to Low
                     {sortConfig.key === 'caddScore' && sortConfig.direction === 'desc' && <Check className="h-4 w-4 text-blue-600 ml-auto" />}
                  </button>
                </div>
              )}
            </div>

            {(statusFilter !== 'All' || courseFilter !== 'All' || searchQuery !== '' || sortConfig.key !== null) && (
               <button 
                onClick={() => { setStatusFilter('All'); setCourseFilter('All'); setSearchQuery(''); setSortConfig({key: null, direction: 'asc'})}}
                className="flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors"
               >
                 <X className="h-4 w-4 mr-1" /> Clear
               </button>
            )}
          </div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th 
                  className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 group"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Name 
                    <ArrowUpDown className={`h-3 w-3 ${sortConfig.key === 'name' ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Courses</th>
                <th 
                  className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 group"
                  onClick={() => handleSort('caddScore')}
                >
                  <div className="flex items-center gap-1">
                    CADD Score
                    <ArrowUpDown className={`h-3 w-3 ${sortConfig.key === 'caddScore' ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-64">Skillset</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((candidate) => {
                  const isSelected = selectedIds.has(candidate.id);
                  const visibleSkills = candidate.skills.slice(0, 5);
                  const remainingSkillsCount = candidate.skills.length - 5;

                  return (
                    <tr key={candidate.id} className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleSelectOne(candidate.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm">
                            {candidate.avatarInitials}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {candidate.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {candidate.caddScore}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center max-w-xs pt-2">
                          {visibleSkills.map(skill => (
                            <SkillBadge key={skill} skill={skill} />
                          ))}
                          {remainingSkillsCount > 0 && (
                            <span className="text-xs font-medium text-blue-600 mb-2 ml-1">+{remainingSkillsCount} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                            <ActionButton icon={Eye} onClick={() => openModal('view', candidate)} />
                            <ActionButton icon={Download} onClick={() => openModal('download', candidate)} />
                            <ActionButton icon={Edit2} onClick={() => openModal('edit', candidate)} />
                            <ActionButton icon={Trash2} onClick={() => openModal('delete', candidate)} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-300 mb-2" />
                      <p>No candidates found matching your filters.</p>
                      <button 
                        onClick={() => { setStatusFilter('All'); setCourseFilter('All'); setSearchQuery(''); }}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Footer & Pagination --- */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="text-sm text-gray-500 hidden sm:block">
            Showing <span className="font-medium text-gray-900">{paginatedData.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span> of <span className="font-medium text-gray-900">{sortedData.length}</span> results
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="hidden sm:flex gap-1">
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
                      className={`px-3.5 py-2 rounded-lg border transition-colors font-medium text-sm ${
                        currentPage === p 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                          : 'border-transparent text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  );
              })}
            </div>
            <div className="sm:hidden text-sm font-medium text-gray-700">
               Page {currentPage} of {totalPages}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Active Modal Rendering --- */}
      {modalState.isOpen && modalState.candidate && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type === 'delete' ? 'danger' : 'default'}
          title={
            modalState.type === 'delete' ? 'Delete Candidate' :
            modalState.type === 'view' ? 'Candidate Profile' :
            modalState.type === 'edit' ? 'Edit Candidate' : 'Download Resume'
          }
          actions={
             modalState.type === 'delete' ? (
              <>
                 <button onClick={closeModal} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                 <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm">Delete</button>
              </>
             ) : (
              <button onClick={closeModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">Close</button>
             )
          }
        >
           <div className="flex flex-col gap-4">
              {modalState.type === 'delete' ? (
                <div className="flex items-start gap-3">
                   <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0">
                      <AlertTriangle size={24} />
                   </div>
                   <div>
                     <p className="text-gray-900 font-medium">Are you sure you want to delete {modalState.candidate.name}?</p>
                     <p className="text-gray-500 text-sm mt-1">This action cannot be undone. This will permanently remove the candidates data.</p>
                   </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                   <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                      {modalState.candidate.avatarInitials}
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-gray-900">{modalState.candidate.name}</h4>
                      <p className="text-gray-500">{modalState.candidate.id}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {modalState.candidate.course}
                      </div>
                   </div>
                   {modalState.type === 'download' && (
                     <div className="ml-auto text-center">
                        <FileText size={40} className="text-blue-200 mx-auto" />
                        <p className="text-xs text-blue-600 font-medium mt-1">Resume.pdf</p>
                     </div>
                   )}
                </div>
              )}
           </div>
        </Modal>
      )}

    </div>
  );
}