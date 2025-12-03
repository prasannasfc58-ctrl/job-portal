"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage({ setRole }: { setRole?: (role: "student" | "company" | null) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 useEffect(() => {

    const hasReloaded = sessionStorage.getItem("login");
  console.log("enter",hasReloaded);
    if (hasReloaded == "false"|| !hasReloaded ) {
      console.log("enter");
      
      sessionStorage.setItem("login", "true");
      window.location.reload();
 // reload only once
    }
  }, []);
  const handleLogin = () => {
    let role: "student" | "company" | null = null;

    if (email === "student@gmail.com" && password === "123") role = "student";
    if (email === "company@gmail.com" && password === "123") role = "company";

    if (!role) {
      alert("Invalid credentials");
      return;
    }

    // Set cookie (expires in 1 day)
    document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24}`;
    // Update role state so sidebar updates immediately
    setRole?.(role);

    // Redirect
    if (role === "student") router.push("/jobs");
    if (role === "company") router.push("/company");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white mr-40">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
         <div className="flex items-center justify-center gap-3 mb-10">
        <hr className="text-gray-400"></hr>
         <img
                                           src="/cadd.png"
                                            alt="CADD Centre"
                                            width={120}
                                            height={70}
                                            className="mx-auto mb-2"/>
      </div>
        <h2 className="text-2xl font-bold text-gray-600 mb-5 text-center">Login</h2>

        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 border rounded mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
