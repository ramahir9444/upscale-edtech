import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return setIsAdmin(false);
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setIsAdmin(userSnap.data().role === "admin");
      }
    };
    checkAdmin();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 animate-fadeIn">
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
          {isAdmin && (
            <Link to="/admin" className="hover:text-blue-700">Admin</Link>
          )}
        </div>

        {/* Desktop Buttons / Status */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-gray-600 font-medium">
                Hi, {user.displayName || user.email.split('@')[0]}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-full transition"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <Link to="/" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/courses" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/portal" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Student Portal</Link>

          {isAdmin && (
            <Link to="/admin" className="block py-2 px-4 border-b hover:bg-gray-100" onClick={() => setOpen(false)}>Admin</Link>
          )}

          {user ? (
            <>
              <p className="px-4 py-2 text-gray-600 font-medium">
                Hi, {user.displayName || user.email.split('@')[0]}
              </p>
              <button
                className="block w-full text-left py-2 px-4 hover:bg-red-100 text-red-600"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2 px-4 hover:bg-gray-100" onClick={() => setOpen(false)}>
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
