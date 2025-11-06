import { useParams, Link } from "react-router-dom";
import { Star, Video, Users, BookOpen, CheckCircle2 } from "lucide-react";

export default function CourseDetail() {
  const { grade } = useParams();

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Grade {grade} — Complete Learning Program
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Build strong foundations with daily live classes, expert mentors, and complete revision support.
        </p>
        <Link
          to="/login"
          className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-full text-lg transition"
        >
          Enroll Now / Free Demo
        </Link>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Course Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/09/15/10/teacher-1245713_960_720.jpg"
            alt="Learning"
            className="rounded-2xl shadow-md w-full"
          />
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              This Grade {grade} program is designed to help students build conceptual clarity through engaging lessons, interactive quizzes, and personalized mentor sessions. 
              With access to live + recorded classes, students learn at their own pace and convenience.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" /> Daily live classes with top mentors
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" /> Doubt-solving sessions every week
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" /> Monthly & weekly tests with reports
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" /> Notes & assignments after each class
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" /> 1:1 mentor support & parent updates
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What You’ll Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-gradient-to-br from-blue-50 to-white">
            <Video className="text-blue-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Live Interactive Classes</h3>
            <p className="text-gray-600 text-sm">Engage with IIT/NIT mentors daily in real-time.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-gradient-to-br from-green-50 to-white">
            <Users className="text-green-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Personalized Mentor Support</h3>
            <p className="text-gray-600 text-sm">1:1 guidance and performance tracking for every student.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-gradient-to-br from-lime-50 to-white">
            <BookOpen className="text-lime-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Recorded Sessions</h3>
            <p className="text-gray-600 text-sm">Revisit any topic anytime with recorded videos.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-gradient-to-br from-pink-50 to-white">
            <Star className="text-pink-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Weekly Tests & Reports</h3>
            <p className="text-gray-600 text-sm">Track progress and improve with instant feedback.</p>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Expert Mentors</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {["Aman (IIT Delhi)", "Sneha (NIT Surat)", "Rohit (IIT Bombay)"].map((mentor, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 w-64 text-center hover:shadow-lg transition">
              <img
                src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i + 20}.jpg`}
                alt={mentor}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">{mentor}</h3>
              <p className="text-gray-500 text-sm">Mentor & Subject Expert</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Parents & Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Aarav", review: "The classes are fun and easy to understand!", rating: 5 },
            { name: "Mrs. Sharma", review: "My child improved a lot in maths and science.", rating: 5 },
            { name: "Riya", review: "Love the teachers! They explain everything so well.", rating: 4 },
          ].map((r, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-gray-600 mb-4 italic">“{r.review}”</p>
              <div className="flex justify-center text-yellow-400 mb-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="font-semibold text-gray-800">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Join Upscale Today</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Learning that lifts you higher — empower your child with the best foundation.
        </p>
        <Link
          to="/login"
          className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-full text-lg transition"
        >
          Enroll Now
        </Link>
      </section>
    </div>
  );
}
