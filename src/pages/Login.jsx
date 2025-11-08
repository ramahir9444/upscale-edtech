import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onEmail = async () => {
    try {
      setBusy(true); setErr("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  const onGoogle = async () => {
    try {
      setBusy(true); setErr("");
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 animate-slideUp">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Upscale Login</h2>

        <input type="email" placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 mb-4"
          onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          className="w-full border rounded-lg px-4 py-3 mb-6"
          onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={onEmail} disabled={busy}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
          {busy ? "Logging in…" : "Login"}
        </button>

        <button onClick={onGoogle} disabled={busy}
          className="w-full mt-3 border rounded-lg py-3 hover:bg-gray-100 transition">
          Continue with Google
        </button>

        {err && <p className="text-red-500 text-center mt-4">{err}</p>}

        <p className="mt-6 text-center text-sm">
          Don’t have an account? <Link to="/signup" className="text-blue-700 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
