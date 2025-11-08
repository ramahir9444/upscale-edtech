import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) { navigate("/login"); return; }
      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists() && snap.data().role === "admin") {
        setOk(true);
      } else {
        navigate("/"); // not admin
      }
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  if (loading) return <div className="p-6 text-center">Loading…</div>;
  return ok ? children : null;
}
