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
    document.cookie = "role=; path=/; max-age=0";
    router.refresh(); // refresh server layout to update sidebar
    router.push("/login");
  };

  if (!role) return null;

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r p-6">
      <div className="flex items-center gap-3 mb-10">
        <img src="/logo.png" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-bold">Portal</h1>
      </div>

      {role === "student" ? (
        <nav className="space-y-3">
          <a href="/student" className="block p-3 rounded-lg hover:bg-orange-100">🏫 Job Portal</a>
          <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg hover:bg-red-100">🔐 Logout</button>
        </nav>
      ) : (
        <nav className="space-y-3">
          <a href="/company/candidates" className="block p-3 rounded-lg hover:bg-orange-100">👥 Candidates</a>
          <a href="/company/jobs" className="block p-3 rounded-lg hover:bg-orange-100">💼 Jobs Post</a>
          <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg hover:bg-red-100">🔐 Logout</button>
        </nav>
      )}
    </aside>
  );
}
