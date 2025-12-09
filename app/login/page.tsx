"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("login");
    if (hasReloaded === "false" || !hasReloaded) {
      sessionStorage.setItem("login", "true");
      window.location.reload();
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

    // Save cookie
    document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24}`;

    // Redirect
    if (role === "student") router.push("/jobs");
    if (role === "company") router.push("/recruitment");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white mr-40">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Image
  src="/cadd.png"
  alt="CADD Centre"
  width={120}
  height={70}
  className="mx-auto mb-2"
/>
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
