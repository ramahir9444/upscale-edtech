import { useState } from "react";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Login */}
        {!isSignup ? (
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Upscale</h2>
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full border rounded-lg px-4 py-2 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 mb-4"
            />
            <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
              Login Securely
            </button>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <button onClick={() => setIsSignup(true)} className="text-blue-700 font-semibold">
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Create Account</h2>
            <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-4 py-2 mb-4" />
            <input type="email" placeholder="Email Address" className="w-full border rounded-lg px-4 py-2 mb-4" />
            <input type="password" placeholder="Create Password" className="w-full border rounded-lg px-4 py-2 mb-4" />
            <input type="password" placeholder="Confirm Password" className="w-full border rounded-lg px-4 py-2 mb-4" />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Create Account
            </button>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button onClick={() => setIsSignup(false)} className="text-blue-700 font-semibold">
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
