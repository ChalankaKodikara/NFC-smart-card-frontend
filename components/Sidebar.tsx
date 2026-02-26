"use client";
import Link from "next/link";

export default function Sidebar({ role }: { role: string }) {
  return (
    <div className="w-64 bg-white border-r h-screen p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">Casknet</h2>

      <nav className="space-y-4 text-sm">
        {role === "SUPER_ADMIN" && (
          <>
            <Link href="/super/dashboard">Dashboard</Link>
            <br />
            <Link href="#">Tenants</Link>
            <br />
            <Link href="#">Admins</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link href="/admin/dashboard">Dashboard</Link>
            <br />
            <Link href="#">Profiles</Link>
            <br />
            <Link href="#">Projects</Link>
          </>
        )}
      </nav>
    </div>
  );
}