import React, { useEffect, useMemo, useState } from "react";
import { getUsersApi, toggleUserStatusApi } from "../../services/authService";
import { toast } from "react-toastify";
import {
  RefreshCw,
  Search,
  User,
  Mail,
  Calendar,
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Power,
  Eye,
  Trash2,
  X,
  Users as UsersIcon,
} from "lucide-react";

// ---------- Types ----------
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt?: string;
  avatar?: string;
  lastLogin?: string;
}

// ---------- Config maps (kept consistent with rest of codebase) ----------
const STATUS_CONFIG = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-600/20",
    icon: CheckCircle2,
  },
  inactive: {
    label: "Inactive",
    dot: "bg-slate-400",
    bg: "bg-slate-50",
    text: "text-slate-600",
    ring: "ring-slate-600/20",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-600/20",
    icon: Clock,
  },
} as const;

const ROLE_CONFIG = {
  admin: { label: "Admin", bg: "bg-slate-900", text: "text-white", icon: ShieldCheck },
  moderator: { label: "Moderator", bg: "bg-indigo-50", text: "text-indigo-700", icon: Shield },
  user: { label: "User", bg: "bg-slate-100", text: "text-slate-600", icon: Shield },
} as const;

const normalizeStatus = (status: string) =>
  (STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ? status : "inactive") as keyof typeof STATUS_CONFIG;

const AVATAR_PALETTE = [
  "from-slate-700 to-slate-900",
  "from-indigo-500 to-indigo-700",
  "from-blue-500 to-blue-700",
  "from-teal-500 to-teal-700",
  "from-rose-500 to-rose-700",
  "from-amber-500 to-amber-600",
];

const avatarGradient = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
};

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"view" | "delete">("view");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersApi();
      setUsers(res?.data?.data || []);
    } catch (error: any) {
      console.error("ERROR:", error?.response?.data || error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = users;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
      );
    }
    if (roleFilter !== "all") result = result.filter((u) => u.role === roleFilter);
    if (statusFilter !== "all") result = result.filter((u) => u.status === statusFilter);
    return result;
  }, [searchTerm, roleFilter, statusFilter, users]);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      pending: users.filter((u) => u.status === "pending").length,
      inactive: users.filter((u) => u.status === "inactive").length,
    }),
    [users]
  );

  const handleToggle = async (id: string) => {
    setTogglingId(id);
    try {
      await toggleUserStatusApi(id);
      toast.success("User status updated successfully");
      fetchUsers();
    } catch (error: any) {
      console.error(error?.response?.data || error);
      toast.error("Failed to update user status");
    } finally {
      setTogglingId(null);
    }
  };

  const hasActiveFilters = searchTerm || roleFilter !== "all" || statusFilter !== "all";

  // ---------- Small presentational pieces ----------
  const StatCard = ({
    label,
    value,
    accent,
  }: {
    label: string;
    value: number;
    accent: string;
  }) => (
    <div className="flex-1 min-w-[120px] rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accent}`} />
        <p className="text-xs font-medium text-slate-500">{label}</p>
      </div>
      <p className="mt-1.5 text-2xl font-semibold text-slate-900 tabular-nums">{value}</p>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const key = normalizeStatus(status);
    const config = STATUS_CONFIG[key];
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.bg} ${config.text} ${config.ring}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </span>
    );
  };

  const RoleBadge = ({ role }: { role: string }) => {
    const config = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.user;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const Avatar = ({ user, size = "md" }: { user: User; size?: "md" | "lg" }) => {
    const sizeClasses = size === "lg" ? "h-16 w-16 text-2xl" : "h-10 w-10 text-sm";
    return user.avatar ? (
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    ) : (
      <div
        className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient(
          user.name
        )} font-semibold text-white shadow-sm ring-2 ring-white`}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  const TableSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i}>
          <td className="px-4 py-3.5">
            <div className="h-3 w-4 animate-pulse rounded bg-slate-100" />
          </td>
          <td className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
              <div className="space-y-1.5">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                <div className="h-2.5 w-40 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </td>
          <td className="px-4 py-3.5">
            <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
          </td>
          <td className="px-4 py-3.5">
            <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
          </td>
          <td className="px-4 py-3.5">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
          </td>
          <td className="px-4 py-3.5">
            <div className="ml-auto h-3 w-16 animate-pulse rounded bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="mx-auto max-w-7xl">
      {/* STAT CARDS */}
      <div className="mb-5 flex flex-wrap gap-3">
        <StatCard label="Total users" value={stats.total} accent="bg-slate-400" />
        <StatCard label="Active" value={stats.active} accent="bg-emerald-500" />
        <StatCard label="Pending" value={stats.pending} accent="bg-amber-500" />
        <StatCard label="Inactive" value={stats.inactive} accent="bg-slate-300" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Users</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage accounts, roles and access
            </p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="all">All roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="w-12 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <TableSkeleton />
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50">
                      <UsersIcon className="h-6 w-6 text-slate-300" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-700">
                      {hasActiveFilters ? "No matching users found" : "No users yet"}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {hasActiveFilters
                        ? "Try a different search term or clear the filters"
                        : "New registrations will show up here"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user._id} className="group transition-colors hover:bg-slate-50/70">
                    <td className="w-12 px-4 py-3 text-center text-sm tabular-nums text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar user={user} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                            <Mail className="h-3 w-3 shrink-0" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} />
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleToggle(user._id)}
                            disabled={togglingId === user._id}
                            title={user.status === "active" ? "Deactivate user" : "Activate user"}
                            className={`rounded-lg p-1.5 transition-colors disabled:opacity-50 ${
                              user.status === "active"
                                ? "text-emerald-600 hover:bg-emerald-50"
                                : "text-slate-400 hover:bg-slate-100"
                            }`}
                          >
                            {togglingId === user._id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Power className="h-4 w-4" />
                            )}
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setModalType("view");
                            setOpenModal(true);
                          }}
                          title="View details"
                          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {user.role !== "admin" && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setModalType("delete");
                              setOpenModal(true);
                            }}
                            title="Delete user"
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER COUNT */}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-slate-700">{filteredUsers.length}</span> of{" "}
              <span className="font-medium text-slate-700">{users.length}</span> users
            </p>
          </div>
        )}
      </div>

      {/* USER DETAIL / DELETE MODAL */}
      {selectedUser && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
            openModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setOpenModal(false)} />

          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>

            {modalType === "view" && (
              <div className="space-y-5">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <Avatar user={selectedUser} size="lg" />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {selectedUser.name}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <RoleBadge role={selectedUser.role} />
                      <StatusBadge status={selectedUser.status} />
                    </div>
                  </div>
                </div>

                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Email address</dt>
                    <dd className="mt-1 flex items-center gap-2 text-sm text-slate-900">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {selectedUser.email}
                    </dd>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Joined</dt>
                      <dd className="mt-1 flex items-center gap-1.5 text-sm text-slate-900">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                    {selectedUser.lastLogin && (
                      <div>
                        <dt className="text-xs font-medium text-slate-500">Last login</dt>
                        <dd className="mt-1 text-sm text-slate-900">
                          {new Date(selectedUser.lastLogin).toLocaleDateString()}
                        </dd>
                      </div>
                    )}
                  </div>
                </dl>

                {selectedUser.role !== "admin" && (
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">Account status</span>
                    <button
                      onClick={() => {
                        handleToggle(selectedUser._id);
                        setOpenModal(false);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        selectedUser.status === "active"
                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      <Power className="h-3.5 w-3.5" />
                      {selectedUser.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {modalType === "delete" && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-800">Delete user</h4>
                    <p className="mt-1 text-sm text-red-600">
                      Are you sure you want to delete <span className="font-medium">{selectedUser.name}</span>?
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: wire up delete API call
                      toast.error("Delete functionality not implemented yet");
                      setOpenModal(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete user
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;