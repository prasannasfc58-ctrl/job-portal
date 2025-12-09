"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutClient({ children }: any) {
  const pathname = usePathname();
  console.log("----------pathname", pathname);
  
  const companyPath = ["/company-list", "/recruitment"];
  const [isCompany, setIsCompany] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const match = companyPath.some(path => pathname.includes(path));
    setIsCompany(match);
    console.log("pathname:", pathname, "isCompany:", match);
  }, [pathname]);

  // Don't render until client is mounted to avoid hydration mismatch
  if (!mounted) {
    return <main className="flex-1 p-6 overflow-y-auto">{children}</main>;
  }

  // Render sidebar only if NOT on login page
  // const showSidebar = pathname !== "/login";

  console.log("----------isCompany", isCompany);

  return (
    <>
        <div className="w-64 block">
          <Sidebar role={isCompany ? "company" : "student"} />
        </div>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </>
  );
}
