import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: book = {} } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const handleAddToShelf = async () => {
    const bookDetails = {
      bookId: id,
      username: user.name,
      email: user.email,
    };
    await axiosSecure
      .post(`/shelf/add-to-read`, bookDetails)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book added Add To Read List.");
        } else {
          toast(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-55 h-80 object-cover rounded-lg shadow-md mx-auto md:mx-0"
        />

        {/* Book Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3">{book.title}</h2>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          <p className="text-gray-700 mb-1 space-x-2">
            <span className="font-semibold">Genre:</span>{" "}
            {book?.genres?.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </p>

          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Rating:</span> ⭐ {book.rating} / 5
          </p>

          <div className="mb-6">
            <p className="font-semibold mb-1">Description:</p>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          {/* Shelf Buttons */}
          <div>
            <p className="font-semibold mb-2">Add to Shelf:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToShelf}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Want to Read
              </button>

              <button
                // onClick={() => handleAddToShelf("Currently Reading")}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                Currently Reading
              </button>

              <button
                // onClick={() => handleAddToShelf("Read")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
