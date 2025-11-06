import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="text-blue-700 w-8 h-8" />
          <span className="text-2xl font-bold text-blue-700">Upscale</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <Link to="/courses" className="hover:text-blue-700">Courses</Link>
          <Link to="/portal" className="hover:text-blue-700">Student Portal</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-full transition"
          >
            Login / Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg">
          <Link to="/" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/courses" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/portal" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Student Portal</Link>
          <Link to="/login" className="block py-2 px-4 hover:bg-gray-100" onClick={() => setOpen(false)}>Login / Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
