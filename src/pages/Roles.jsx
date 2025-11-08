import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  collection, doc, onSnapshot, query, updateDoc, where, getDocs
} from "firebase/firestore";

export default function Roles() {
  const [allUsers, setAllUsers] = useState([]);
  const [term, setTerm] = useState("");
  const [busyId, setBusyId] = useState("");

  // realtime users
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (ss) => {
      setAllUsers(ss.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return allUsers;
    return allUsers.filter(u =>
      (u.email || "").toLowerCase().includes(t) ||
      (u.fullName || "").toLowerCase().includes(t)
    );
  }, [term, allUsers]);

  const setRole = async (uid, role) => {
    try {
      setBusyId(uid);
      await updateDoc(doc(db, "users", uid), { role });
    } finally {
      setBusyId("");
    }
  };

  // quick search by email to update role directly
  const makeAdminByEmail = async () => {
    const t = term.trim().toLowerCase();
    if (!t) return;
    const qs = await getDocs(query(collection(db, "users"), where("email", "==", t)));
    if (!qs.empty) {
      const u = qs.docs[0];
      await updateDoc(doc(db, "users", u.id), { role: "admin" });
      setTerm("");
    } else {
      alert("No user found with that email");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Role Manager</h1>
          <a href="/admin" className="text-blue-700 underline">Back to Admin</a>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            placeholder="Search by email or name…"
            className="border rounded-lg p-3 flex-1"
            value={term}
            onChange={(e)=>setTerm(e.target.value)}
          />
          <button onClick={makeAdminByEmail}
            className="px-4 py-3 rounded-lg border hover:bg-gray-100">Make Admin by Email</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 border text-left">Name</th>
                <th className="px-3 py-2 border text-left">Email</th>
                <th className="px-3 py-2 border text-left">Phone</th>
                <th className="px-3 py-2 border text-left">Role</th>
                <th className="px-3 py-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.uid} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{u.fullName || "-"}</td>
                  <td className="px-3 py-2 border">{u.email || "-"}</td>
                  <td className="px-3 py-2 border">{u.phone || "-"}</td>
                  <td className="px-3 py-2 border">{u.role || "user"}</td>
                  <td className="px-3 py-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRole(u.uid, "user")}
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                        disabled={busyId === u.uid}
                      >
                        Make User
                      </button>
                      <button
                        onClick={() => setRole(u.uid, "admin")}
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                        disabled={busyId === u.uid}
                      >
                        Make Admin
                      </button>
                      {/* Optional remove user document from users collection (not Auth delete) */}
                      {/* <button className="px-3 py-1 border rounded hover:bg-gray-100">Remove</button> */}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
