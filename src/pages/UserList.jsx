import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    })();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-grow p-8 ml-60">
        <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

        <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="text-center border-b">
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.phone}</td>
                  <td className="p-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
