"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Trash2, Pencil, Eye, Building2 } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    status: "ACTIVE",
  });

  const router = useRouter();

  const fetchClients = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/admin/clients", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setClients(data.data || []);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/admin/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    setFormData({ companyName: "", email: "", status: "ACTIVE" });
    fetchClients();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/admin/clients/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchClients();
  };

  const filteredClients = clients.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Client Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all NFC clients</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
        <input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-5">Company</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.map((client: any) => (
              <tr
                key={client._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-5 font-medium text-black flex items-center gap-3">
                  <div className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    {client.companyName?.charAt(0)}
                  </div>
                  {client.companyName}
                </td>

                <td className="text-gray-600">{client.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : client.status === "INACTIVE"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>

                <td className="text-center space-x-3">
                  <button
                    onClick={() => router.push(`/super/clients/${client._id}`)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/super/clients/${client._id}?edit=true`)
                    }
                    className="text-gray-600 hover:text-black"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold mb-6 text-black">Add Client</h2>

            <input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyName: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
