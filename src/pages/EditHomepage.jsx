import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AdminSidebar from "../components/AdminSidebar";

export default function EditHomePage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      const ref = doc(db, "content", "homepage");
      const snapshot = await getDoc(ref);
      setContent(snapshot.data());
    };

    fetchHomeContent();
  }, []);

  const handleSave = async () => {
    const ref = doc(db, "content", "homepage");
    await updateDoc(ref, content);
    alert("Homepage updated successfully!");
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-10 ml-64">
        <h1 className="text-2xl font-bold mb-4">Edit Home Page Content</h1>

        <label className="block mb-4">
          Hero Title:
          <input
            type="text"
            value={content.heroTitle}
            onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
            className="w-full p-2 mt-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          Hero Subtitle:
          <textarea
            value={content.heroSubtitle}
            onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
            className="w-full p-2 mt-2 border rounded h-24"
          />
        </label>

        {/* Add more fields or editable lists for features and reviews similarly */}
        
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
