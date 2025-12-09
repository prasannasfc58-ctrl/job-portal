"use client"
import { Spin } from "antd";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  console.log("--------------pathname",pathname)
  const router = useRouter();
  useEffect(() => {
      console.log("--------------pathname",pathname)
    if (pathname === "student") {
      // document.cookie = `role=student; path=/; max-age=${60 * 60 * 24}`;
      router.push("/student");
    }
    else if (pathname === "recruitment") {
      // document.cookie = `role=company; path=/; max-age=${60 * 60 * 24}`;
      router.push("/recruitment");
    }
    else router.push('/student');
  }, [])
  return (
    <div className="flex-1">
      <Spin />
    </div>
  );
}
