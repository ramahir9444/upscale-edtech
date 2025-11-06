import { Star } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-700 to-blue-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Master Grades 1–10 with Daily Live Classes
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Learning that lifts you higher 🚀 — Upscale offers live teaching, instant doubt solving, mentor support, and flexible recorded access.
        </p>
        <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-full text-lg transition">
          Start Your 7-Day FREE Demo
        </button>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Upscale?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            ["⚡", "Daily Live Classes", "Engage with mentors and classmates in real-time."],
            ["🎥", "Recorded Access", "Access recorded lessons anytime for easy revision."],
            ["🧑‍🏫", "Expert IIT & NIT Faculty", "Learn from India’s top educators from IITs & NITs."],
            ["💬", "Doubt Solving", "Personalized sessions for quick and effective resolution."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center">
              <div className="text-blue-600 text-4xl mb-3">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">What Parents Say 💬</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            ["“Upscale has made my child confident in math and science!”", "— Priya Sharma"],
            ["“The live classes and mentors are amazing. My son loves learning now.”", "— Rajesh Patel"],
            ["“Flexible schedule, great teachers, and super support team!”", "— Meena Iyer"],
          ].map(([quote, name]) => (
            <div key={name} className="p-6 border rounded-xl shadow-sm bg-gray-50">
              <div className="flex justify-center mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} fill="yellow" />)}
              </div>
              <p className="text-gray-700 italic mb-3">{quote}</p>
              <p className="font-semibold text-gray-800">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-indigo-700 text-white text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Learning?</h3>
        <button className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold text-lg transition">
          View Courses & Enroll
        </button>
        <p className="text-gray-200 text-sm mt-8">
          © 2025 Upscale EdTech. All rights reserved.
        </p>
      </section>
    </div>
  );
}
