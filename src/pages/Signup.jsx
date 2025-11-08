import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!fullName.trim()) return "Full name is required";
    if (!/^\d{10}$/.test(phone)) return "Enter a valid 10-digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  };

  const ensureUnique = async () => {
    const usersRef = collection(db, "users");
    const [sameEmail, samePhone] = await Promise.all([
      getDocs(query(usersRef, where("email", "==", email))),
      getDocs(query(usersRef, where("phone", "==", phone))),
    ]);
    if (!sameEmail.empty) throw new Error("Email already exists");
    if (!samePhone.empty) throw new Error("Phone number already exists");
  };

  const onSignup = async () => {
    const v = validate();
    if (v) return setErr(v);
    try {
      setBusy(true); setErr("");

      // client-side uniqueness check (best effort)
      await ensureUnique();

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        fullName,
        email,
        phone,
        provider: "password",
        role: "user",
        createdAt: serverTimestamp(),
      });

      navigate("/"); // go home (or /admin if you prefer)
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 animate-slideUp">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Account</h2>

        <input className="w-full border rounded-lg px-4 py-3 mb-3" placeholder="Full Name"
          value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-3 mb-3" placeholder="Phone (10 digits)"
          value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-3 mb-3" placeholder="Email Address" type="email"
          value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-3 mb-3" placeholder="Password" type="password"
          value={password} onChange={e=>setPassword(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-3 mb-6" placeholder="Confirm Password" type="password"
          value={confirm} onChange={e=>setConfirm(e.target.value)} />

        <button onClick={onSignup} disabled={busy}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
          {busy ? "Creating Account…" : "Sign Up"}
        </button>

        {err && <p className="text-red-500 text-center mt-4">{err}</p>}

        <p className="mt-6 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
