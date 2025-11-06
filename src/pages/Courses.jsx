import { Lightbulb, Rocket, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Courses() {
  const courses = [
    { grade: "1", status: "full", icon: <Lightbulb className="w-10 h-10" /> },
    { grade: "3", status: "full", icon: <Lightbulb className="w-10 h-10" /> },
    { grade: "4", status: "active", icon: <Lightbulb className="w-10 h-10" /> },
    { grade: "7", status: "active", icon: <Rocket className="w-10 h-10" /> },
    { grade: "8", status: "active", icon: <Rocket className="w-10 h-10" /> },
    { grade: "9", status: "full", icon: <Lightbulb className="w-10 h-10" /> },
    { grade: "10", status: "full", icon: <Search className="w-10 h-10" /> },
    { grade: "X", status: "active", icon: <Search className="w-10 h-10" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Discover Our Programs (Grades 1–10)
      </h1>
      <p className="text-gray-500 mb-12">Choose your grade to view details and enroll.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {courses.map((course, index) => {
          const isActive = course.status === "active";
          return (
            <div
              key={index}
              className={`relative p-6 rounded-2xl shadow-md transition transform hover:scale-105 hover:shadow-xl ${
                isActive
                  ? "bg-gradient-to-br from-blue-400 to-green-400 text-white"
                  : "bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500"
              }`}
            >
              {/* Status Tag */}
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
                  isActive ? "bg-white text-blue-700" : "bg-red-200 text-red-700"
                }`}
              >
                {isActive ? "ACTIVE ENROLLMENT" : "SEATS FULL"}
              </span>

              <div className="flex flex-col justify-center items-center space-y-4 py-8">
                <div>{course.icon}</div>
                <h2 className="text-2xl font-bold">Grade {course.grade}</h2>

                {isActive ? (
                  <Link to={`/courses/${course.grade}`}>
                    <button className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-full transition">
                      View Details & Enroll
                    </button>
                  </Link>
                ) : (
                  <button className="mt-4 bg-gray-400 cursor-not-allowed text-white font-semibold px-4 py-2 rounded-full">
                    {["9", "10"].includes(course.grade)
                      ? "Join Waitlist"
                      : "Panel Full"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Seats are filling fast! Don’t miss your chance.
        </h3>
        <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-full text-lg transition">
          Book Your Free Demo
        </button>
      </div>
    </div>
  );
}
