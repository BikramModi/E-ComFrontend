import { useEffect, useState } from "react";
import UsersCard from "./UsersCard";
import api from "../api/axios";
import { toast } from "react-toastify";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.users || res.data.data || []);
      toast.success("Users loaded successfully ✅");
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑 Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted successfully ✅");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // 🔁 Change role
  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}`, { role });
      toast.success("User role updated successfully ✅");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Role update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 animate-pulse">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          All Users
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Manage and control user accounts from here.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No users found.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3">
            {users.map((user) => (
              <UsersCard
                key={user._id}
                user={user}
                onDelete={deleteUser}
                onChangeRole={changeRole}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;