import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { toast } from "react-hot-toast"; // optional, for notifications
// import Title from "../components/Title"; // Assume you have a Title component

const demoGenres = [
  { id: 1, name: "রহস্য" },
  { id: 2, name: "রোমান্স" },
  { id: 3, name: "সায়েন্স ফিকশন" },
  { id: 4, name: "ইতিহাস" },
];

const ManageGenres = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [editGenreId, setEditGenreId] = useState(null);
  const [editGenreName, setEditGenreName] = useState("");

  useEffect(() => {
    // Replace this with API call later
    setGenres(demoGenres);
  }, []);

  // Add new genre
  const handleAddGenre = () => {
    if (!newGenre.trim()) return;
    const newId = genres.length ? Math.max(...genres.map((g) => g.id)) + 1 : 1;
    setGenres([...genres, { id: newId, name: newGenre }]);
    setNewGenre("");
    toast.success("Genre added successfully!");
  };

  // Edit genre
  const handleEditGenre = (genre) => {
    setEditGenreId(genre.id);
    setEditGenreName(genre.name);
  };

  const handleUpdateGenre = () => {
    setGenres(
      genres.map((g) =>
        g.id === editGenreId ? { ...g, name: editGenreName } : g
      )
    );
    setEditGenreId(null);
    setEditGenreName("");
    toast.success("Genre updated successfully!");
  };

  // Delete genre
  const handleDeleteGenre = (id) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      setGenres(genres.filter((g) => g.id !== id));
      toast.success("Genre deleted successfully!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* <Title title="Manage Genres" /> */}

      {/* Add New Genre */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="নতুন genre লিখুন"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddGenre}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </div>

      {/* Genre List Table */}
      <div className="bg-white shadow rounded">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Genre Name</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{genre.id}</td>

                <td className="p-3 border-b">
                  {editGenreId === genre.id ? (
                    <input
                      type="text"
                      value={editGenreName}
                      onChange={(e) => setEditGenreName(e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    genre.name
                  )}
                </td>

                <td className="p-3 border-b flex gap-2">
                  {editGenreId === genre.id ? (
                    <>
                      <button
                        onClick={handleUpdateGenre}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Save
                      </button>
                      <button
                        onClick={() => setEditGenreId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditGenre(genre)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGenre(genre.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {genres.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  কোনো genre নেই
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageGenres;
