import { Link } from "react-router-dom";

export default function AdminPortal() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-xl animate-slideUp text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h2>

        <div className="space-y-4">
          <Link
            to="/admin/users"
            className="block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            View Registered Users
          </Link>

          <Link
            to="/admin/roles"
            className="block px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Manage User Roles
          </Link>
            <Link
            to="/admin/home"
            className="block px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Manage home page 
          </Link>
        </div>
      </div>
    </div>
  );
}
