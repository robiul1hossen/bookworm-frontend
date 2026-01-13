import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

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
  console.log(book);

  const handleWantToRead = async () => {
    const bookDetails = {
      bookId: id,
      username: user.name,
      email: user.email,
    };
    await axiosSecure
      .post(`/shelf/want-to-read`, bookDetails)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book added to Want To Read list.");
        } else {
          toast(res.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCurrentlyReading = async () => {
    const bookDetails = {
      bookId: id,
      username: user.name,
      email: user.email,
    };
    await axiosSecure
      .post(`/shelf/currently-reading`, bookDetails)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book added to Currently Reading list.");
        } else {
          toast(res.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleRead = async () => {
    const bookDetails = {
      bookId: id,
      username: user.name,
      email: user.email,
    };
    await axiosSecure
      .post(`/shelf/read`, bookDetails)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book added to Read list.");
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

          <div>
            <p className="font-semibold mb-2">Add to Shelf:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWantToRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Want to Read
              </button>

              <button
                onClick={handleCurrentlyReading}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                Currently Reading
              </button>

              <button
                onClick={handleRead}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Read
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {book?.reviews?.map((review) => (
          <div className="mt-8" key={review.userEmail}>
            <div className="flex gap-5 items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co.com/G3RSZkPh/robi.png"
                alt=""
              />
              <div className="flex flex-col">
                <div className="flex">
                  <p className="text-gray-400">By </p>{" "}
                  <h4>
                    {review.userName}{" "}
                    <span className="text-gray-400">{review?.date}</span>
                  </h4>
                </div>
                <div>
                  <Rating
                    readonly
                    initialRating={review.rating}
                    emptySymbol={<CiStar fill="#ff9900" stroke="#ff9900" />}
                    fullSymbol={<FaStar fill="#ff9900" stroke="#ff9900" />}
                    fractions={2}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h2>{review?.comment}</h2>
              <span className="mt-3 text-gray-400">
                Was this review helpful to you?
              </span>
            </div>
          </div>
        ))}
        <div className="flex flex-col">
          <textarea
            name=""
            id=""
            placeholder="write a review"
            className="border outline-none w-full md:w-2/6 px-4 py-2"></textarea>
          <div className="md:w-2/6 mt-2 flex justify-end">
            <button className="btn bg-[#ff9900] w-full md:w-fit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
