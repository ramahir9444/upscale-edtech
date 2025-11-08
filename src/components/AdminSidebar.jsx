import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin" className="hover:text-gray-200">Dashboard</Link>
        <Link to="/admin/home" className="hover:text-gray-200">Manage Home Page</Link>
        <Link to="/admin/roles" className="hover:text-gray-200">Manage Roles</Link>
      </nav>
    </div>
  );
}
