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

  /* =====================================
     🔐 LOGIN HANDLER
  ===================================== */

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 🧹 Clear old session
      Cookies.remove("token");
      Cookies.remove("user");
      localStorage.clear();

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token, user } = data;
      const { role, tenantId, tenantSlug } = user;

      /* =====================================
         ✅ SAVE SESSION
      ===================================== */

      // Save token in cookie
      Cookies.set("token", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      // Save user in cookie
      Cookies.set("user", JSON.stringify(user), {
        expires: 1,
      });

      // Save useful values in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (tenantId) {
        localStorage.setItem("tenantId", tenantId);
      }

      if (tenantSlug) {
        localStorage.setItem("tenantSlug", tenantSlug);
      }

      /* =====================================
         🚀 ROLE BASED ROUTING
      ===================================== */

      if (role === "SUPER_ADMIN") {
        router.push("/super/dashboard");
        return;
      }

      if (role === "CLIENT_ADMIN") {
        if (!tenantId) {
          throw new Error("Tenant ID missing");
        }

        router.push(`/admin/clients/${tenantId}`);
        return;
      }

      // fallback
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     ⌨️ ENTER KEY SUPPORT
  ===================================== */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">
            Casknet Admin Portal
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            NFC Digital Business Card System
          </p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full border border-gray-300 p-4 rounded-xl mb-4 text-black focus:ring-2 focus:ring-black outline-none transition disabled:opacity-60"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full border border-gray-300 p-4 rounded-xl mb-4 text-black focus:ring-2 focus:ring-black outline-none transition disabled:opacity-60"
        />

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
