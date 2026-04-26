import React, { useEffect, useState } from "react";
import { getUsersApi } from "../../services/authService";

const UserListPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsersApi();
      console.log(res);

      // 🔥 important (tumhara response structure)
      setUsers(res.data);

    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">Users List</h2>

      {/* LOADING */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user: any, index: number) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                      {user.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {user.isEmailVerified ? "✅ Yes" : "❌ No"}
                  </td>

                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default UserListPage;