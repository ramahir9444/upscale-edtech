import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ManageRoles() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const searchUser = async () => {
    setMessage("");
    setUser(null);

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setMessage("User not found");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    setUser({ id: userDoc.id, ...userData });
  };

  const toggleRole = async () => {
    if (!user) return;

    const newRole = user.role === "admin" ? "user" : "admin";

    await updateDoc(doc(db, "users", user.id), { role: newRole });
    setUser(prev => ({ ...prev, role: newRole }));
    setMessage(`Role updated to ${newRole}`);
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-grow p-8 ml-60">
        <h1 className="text-2xl font-bold mb-4">Manage User Roles</h1>

        <input
          type="email"
          className="w-full max-w-lg border rounded-lg px-4 py-2 mb-4"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={searchUser}
        >
          Search
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}

        {user && (
          <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Current Role:</strong> {user.role}</p>

            <button
              onClick={toggleRole}
              className={`mt-4 px-4 py-2 rounded-lg text-white 
                ${user.role === "admin" ? "bg-red-500" : "bg-green-500"}
              `}
            >
              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
