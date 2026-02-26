"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  ShieldCheck,
  BadgeCheck,
  KeyRound,
} from "lucide-react";

export default function ClientDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");

  const fetchClient = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/admin/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    setData(result.data);
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  const handleResetPassword = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/super/reset-password/${selectedAdmin._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      },
    );

    setShowReset(false);
    setNewPassword("");
    alert("Password reset successfully");
  };

  if (!data) return <div className="p-10">Loading...</div>;

  const { tenant, admins, stats } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {tenant.companyName}
            </h1>
            <p className="text-gray-500 text-sm">
              Super Admin Management Panel
            </p>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            {editMode ? "Cancel Edit" : "Edit"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-12">
        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Users size={18} />}
            title="Total Admins"
            value={stats.totalAdmins}
          />
          <StatCard
            icon={<ShieldCheck size={18} />}
            title="Active Admins"
            value={stats.activeAdmins}
          />
          <StatCard
            icon={<BadgeCheck size={18} />}
            title="Status"
            value={stats.status}
          />
          <StatCard
            icon={<Calendar size={18} />}
            title="Created"
            value={new Date(stats.createdAt).toLocaleDateString()}
          />
        </div>

        {/* TENANT SECTION */}
        <SectionCard title="Tenant Information">
          <InputField
            label="Company Name"
            value={tenant.companyName}
            editMode={editMode}
          />
          <InputField label="Slug" value={tenant.slug} editMode={editMode} />
          <InputField label="Tenant ID" value={tenant._id} editMode={false} />
          <InputField
            label="Created At"
            value={new Date(tenant.createdAt).toLocaleString()}
            editMode={false}
          />
          <InputField
            label="Updated At"
            value={new Date(tenant.updatedAt).toLocaleString()}
            editMode={false}
          />
        </SectionCard>

        {/* ADMIN SECTION */}
        <SectionCard title="Client Admins">
          {admins.map((admin: any) => (
            <div key={admin._id} className="border-b pb-6 mb-6 space-y-4">
              <InputField label="Name" value={admin.name} editMode={editMode} />
              <InputField
                label="Email"
                value={admin.email}
                editMode={editMode}
              />
              <InputField
                label="Username"
                value={admin.username}
                editMode={false}
              />
              <InputField label="Role" value={admin.role} editMode={false} />
              <InputField
                label="Created At"
                value={new Date(admin.createdAt).toLocaleString()}
                editMode={false}
              />

              {/* RESET BUTTON */}
              <button
                onClick={() => {
                  setSelectedAdmin(admin);
                  setShowReset(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                <KeyRound size={16} />
                Reset Password
              </button>
            </div>
          ))}
        </SectionCard>
      </div>

      {/* RESET MODAL */}
      {showReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-3 rounded-lg mb-6 text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* UI COMPONENTS */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
}

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function InputField({ label, value, editMode }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        value={value}
        disabled={!editMode}
        className="w-full border rounded-lg px-4 py-3 bg-gray-50 text-gray-900"
      />
    </div>
  );
}
