"use client"

import CompanyCandidate from "@/components/candidatetable";
import { useEffect } from "react";

export default function CompanyHome() {
  useEffect(() => {
  
      const hasReloaded = sessionStorage.getItem("CompanyHome");
    console.log("enter",hasReloaded);
      if (hasReloaded == "false" || !hasReloaded ) {
        console.log("enter");
        
        sessionStorage.setItem("CompanyHome", "true");
        window.location.reload();
   // reload only once
      }
    }, [])
  return (
    <div>
      <h1 className="text-3xl font-bold">Company Dashboard</h1>
     <CompanyCandidate/>
    </div>
  );
}
