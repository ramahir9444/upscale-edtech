import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetail from "./pages/CourseDetail";
import AdminPortal from "./pages/AdminPortal";
import UserList from "./pages/UserList";
import ManageRoles from "./pages/ManageRoles";
import EditHomePage from "./pages/EditHomepage";

// Route guard component
import RequireAdmin from "./components/RequireAdmin";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPortal />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireAdmin>
                <UserList />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <RequireAdmin>
                <ManageRoles />
              </RequireAdmin>
            }
          />
          <Route
  path="/admin/home"
  element={
    <RequireAdmin>
      <EditHomePage />
    </RequireAdmin>
  }
/>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
