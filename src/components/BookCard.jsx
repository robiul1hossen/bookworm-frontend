import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <div className="px-2 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Cover */}
      <h3 className="font-semibold line-clamp-2">
        {book.title.slice(0, 30)}...
      </h3>
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-37.5 object-cover"
      />

      <div className="p-4 space-y-1">
        <p className="text-sm text-gray-600">by {book.author}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full space-x-2">
            {book.genres.map((g) => (
              <span>{g}</span>
            ))}
          </span>

          <span className="text-sm font-medium text-yellow-500">
            ⭐ {book.rating}
          </span>
        </div>

        {/* Action */}
        <Link to={`/books/${book._id}`}>
          <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
