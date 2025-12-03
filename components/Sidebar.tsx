"use client";
import { useRouter } from "next/navigation";

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
    <aside className="w-64 h-screen fixed bg-white shadow-lg border-r p-6">
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
        <nav className="space-y-3">
          <a href="/student" className="block p-3 rounded-lg hover:bg-orange-100">🏫 Job Portal</a>
          <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg hover:bg-red-100">🔐 Logout</button>
        </nav>
      ) : (
        <nav className="space-y-3">
          <a href="/company" className="block p-3 rounded-lg hover:bg-orange-100">👥 Candidates</a>
          <a href="/company/jobs" className="block p-3 rounded-lg hover:bg-orange-100">💼 Jobs Post</a>
          <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg hover:bg-red-100">🔐 Logout</button>
        </nav>
      )}
    </aside>
  );
}
