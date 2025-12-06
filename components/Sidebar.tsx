"use client";
import { useRouter } from "next/navigation";
  import {
  Briefcase,          // Job Portal
  User,               // My Profile
  Lock,               // Privacy Policy
  BookOpen,           // My Courses
  Phone   ,
  LogOut   ,Users          // Contact Us
} from "lucide-react";


type SidebarProps = {
  role: "student" | "company" | null;
};

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
      sessionStorage.setItem("jobsReloaded", "false");
       sessionStorage.setItem("CompanyHome", "false");
        sessionStorage.setItem("login", "false");
    document.cookie = "role=; path=/; max-age=0";
    router.refresh(); // refresh server layout to update sidebar
    router.push("/login");
  };

  if (!role) return null;

  return (
    <aside className="w-64 h-screen fixed bg-white shadow-lg border-r border-gray-200 p-6">
      <div className="flex items-center justify-center gap-3 mb-10">
        <hr className="text-gray-400"></hr>
         <img
                                           src="/cadd.png"
                                            alt="CADD Centre"
                                            width={120}
                                            height={70}
                                            className="mx-auto mb-2"/>
      </div>

      {role === "student" ? (
      

<nav className="space-y-2 text-gray-700">


  <a href="/profile" className="flex items-center gap-2 p-3 rounded-lg hover:bg-orange-100">
    <User size={18} />
    <span>My Profile</span>
  </a>

  <a href="/privacy-policy" className="flex items-center gap-2 p-3 rounded-lg hover:bg-orange-100">
    <Lock size={18} />
    <span>Privacy Policy</span>
  </a>

  <a href="/my-courses" className="flex items-center gap-2 p-3 rounded-lg hover:bg-orange-100">
    <BookOpen size={18} />
    <span>My Courses</span>
  </a>

  <a href="/jobs" className="flex items-center gap-2 p-3 rounded-lg hover:bg-orange-100">
    <Briefcase size={18} />
    <span>Job Portal</span>
  </a>
  <a href="/contact-us" className="flex items-center gap-2 p-3 rounded-lg hover:bg-orange-100">
    <Phone size={18} />
    <span>Contact Us</span>
  </a>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-100 text-left text-red-700"
  >
    <Lock size={18} />
    <span>Logout</span>
  </button>

</nav>

      ) : (
       

<nav className="space-y-3 text-gray-800">

  <a
    href="/company-list"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 transition"
  >
    <Users size={20} />
    <span>Candidates</span>
  </a>

  <a
    href="/company"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 transition"
  >
    <Briefcase size={20} />
    <span>Jobs Post</span>
  </a>

  <button
    onClick={handleLogout}
    className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-red-100 text-red-700 transition"
  >
    <LogOut size={20} />
    <span>Logout</span>
  </button>

</nav>

      )}
    </aside>
  );
}
