"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage({ setRole }: { setRole?: (role: "student" | "company" | null) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

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
