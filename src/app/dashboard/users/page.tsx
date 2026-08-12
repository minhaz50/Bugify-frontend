"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Shield, User, Search } from "lucide-react";
import toast from "react-hot-toast";

const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@Bugify.com",
    role: "maintainer",
    joined: "2026-01-10",
    issues: 12,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@Bugify.com",
    role: "contributor",
    joined: "2026-02-05",
    issues: 8,
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@Bugify.com",
    role: "contributor",
    joined: "2026-02-20",
    issues: 5,
  },
  {
    id: 4,
    name: "David Park",
    email: "david@Bugify.com",
    role: "contributor",
    joined: "2026-03-01",
    issues: 3,
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@Bugify.com",
    role: "maintainer",
    joined: "2026-03-15",
    issues: 20,
  },
];

export default function UsersPage() {
  const { isMaintainer } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? u.role === roleFilter : true),
  );

  if (!isMaintainer) {
    return (
      <div className="text-center py-20 text-slate-500">
        Access denied. Maintainers only.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Manage Users
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {filtered.length} users registered on Bugify.
        </p>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-auto"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="contributor">Contributor</option>
          <option value="maintainer">Maintainer</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
              {["User", "Role", "Issues", "Joined", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {u.name}
                      </p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`badge ${u.role === "maintainer" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}
                  >
                    {u.role === "maintainer" ? (
                      <Shield className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {u.issues}
                </td>
                <td className="px-5 py-4 text-sm text-slate-400">
                  {new Date(u.joined).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => toast("User management coming soon!")}
                    className="btn-secondary btn-sm text-xs"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
