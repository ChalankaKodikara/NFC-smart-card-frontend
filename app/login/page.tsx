"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { ArrowRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      Cookies.remove("token");
      Cookies.remove("user");
      localStorage.clear();

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      const { token, user } = data;
      const { role, tenantId } = user;

      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "SUPER_ADMIN") {
        router.push("/super/dashboard");
      } else if (role === "CLIENT_ADMIN") {
        router.push(`/admin/clients/${tenantId}`);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* ================= LEFT LOGIN SIDE ================= */}
      <div className="flex items-center justify-center bg-white px-8 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-black mb-4">Sign In</h2>

          <p className="text-gray-500 mb-8">
            Use the username and password provided in your welcome letter.
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 text-black focus:ring-2 focus:ring-[#FACC15] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 text-black focus:ring-2 focus:ring-[#FACC15] outline-none"
          />

          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#FACC15] text-black py-4 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= RIGHT BRAND SIDE ================= */}
      <div className="hidden md:flex flex-col justify-center items-center bg-black text-white px-16 relative overflow-hidden">
        {/* Soft Yellow Glow */}
        <div className="absolute w-96 h-96 bg-[#FACC15]/20 rounded-full blur-3xl top-10 right-10"></div>

        <div className="relative z-10 max-w-md text-left">
          <h3 className="text-[#FACC15] uppercase text-sm font-semibold mb-4">
            Casknet NFC Solution
          </h3>

          <h1 className="text-4xl font-bold mb-6">
            Manage Your Digital Business Card
          </h1>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Access your admin dashboard to update your profile, manage social
            links, customize sections and monitor your digital networking
            performance.
          </p>

          <div className="space-y-4 text-gray-300">
            <Feature text="Update portfolio anytime" />
            <Feature text="Add social media links" />
            <Feature text="Edit experience & contact info" />
            <Feature text="Track profile engagement" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= FEATURE ITEM ================= */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#FACC15]">✔</span>
      <span>{text}</span>
    </div>
  );
}
