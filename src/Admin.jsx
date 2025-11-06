import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "homeContent"));
    setItems(querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!title || !description) return;
    await addDoc(collection(db, "homeContent"), { title, description });
    setTitle("");
    setDescription("");
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "homeContent", id));
    fetchData();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Portal</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded mb-3 flex justify-between"
        >
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin; // ✅ this must be at the end
