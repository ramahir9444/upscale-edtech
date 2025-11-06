import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import CourseDetail from "./pages/CourseDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
