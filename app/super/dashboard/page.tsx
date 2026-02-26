"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  AlertTriangle,
  Ban,
  BarChart3,
} from "lucide-react";

export default function SuperDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    suspended: 0,
    inactive: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/admin/clients/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) setStats(data.data);
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-black">Super Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your NFC client ecosystem
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={stats.total}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Active"
          value={stats.active}
          icon={<CheckCircle size={20} />}
          color="text-green-600"
        />

        <StatCard
          title="Inactive"
          value={stats.inactive}
          icon={<AlertTriangle size={20} />}
          color="text-yellow-500"
        />

        <StatCard
          title="Suspended"
          value={stats.suspended}
          icon={<Ban size={20} />}
          color="text-red-600"
        />
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CLIENT DISTRIBUTION */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={18} className="text-gray-500" />
            <h3 className="font-semibold text-black">Client Distribution</h3>
          </div>

          <ProgressBar
            label="Active"
            value={stats.active}
            total={stats.total}
            color="bg-green-500"
          />

          <ProgressBar
            label="Inactive"
            value={stats.inactive}
            total={stats.total}
            color="bg-yellow-500"
          />

          <ProgressBar
            label="Suspended"
            value={stats.suspended}
            total={stats.total}
            color="bg-red-500"
          />
        </div>

        {/* SYSTEM OVERVIEW */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-black mb-4">System Overview</h3>

          <div className="space-y-4 text-gray-600">
            <p>
              Total NFC clients onboarded:{" "}
              <span className="font-semibold text-black">{stats.total}</span>
            </p>

            <p>
              Active clients running NFC services:{" "}
              <span className="font-semibold text-green-600">
                {stats.active}
              </span>
            </p>

            <p>
              Clients requiring attention:{" "}
              <span className="font-semibold text-red-600">
                {stats.suspended}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= COMPONENTS ========================= */

function StatCard({ title, value, icon, color = "text-black" }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>

      <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

function ProgressBar({ label, value, total, color }: any) {
  const percentage = total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-black">{value}</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
