import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BookCard from "../../components/BookCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";

const BrowseBook = () => {
  const axiosSecure = useAxiosSecure();
  const [allGenres, setAllGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const { data: booksData = {}, isLoading } = useQuery({
    queryKey: ["books", page, search, genre, sort],
    queryFn: async () => {
      const res = await axiosSecure.get("/books", {
        params: {
          page,
          limit: 10,
          search,
          genre,
          sort,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    axiosSecure
      .get("/genres")
      .then((res) => {
        setAllGenres(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure]);
  const newAllGenres = allGenres.map((genre) => genre.name.toLowerCase());

  const books = booksData.result || [];
  const totalPages = booksData.totalPage || 0;

  return (
    <div className="px-4">
      <div className="flex justify-items-end justify-end text-end">
        <div className="">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Search books..."
            className="input outline-none"
          />

          <fieldset className="fieldset">
            <select
              onChange={(e) => setGenre(e.target.value)}
              className="select outline-none">
              <option value={genre} disabled={true}>
                Select Genre
              </option>
              {newAllGenres.map((gen) => (
                <option value={gen}>{gen}</option>
              ))}
            </select>
          </fieldset>
          <fieldset className=" fieldset">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="select select-bordered mb-4 outline-none">
              <option value="">Sort by Rating</option>
              <option value="rating_asc">Rating: Low to High</option>
              <option value="rating_desc">Rating: High to Low</option>
            </select>
          </fieldset>
        </div>
      </div>

      {isLoading && <Loader />}

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}

        {!isLoading && books.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No books found
          </p>
        )}
      </div>
      <button className="btn btn-primary">{page}</button>

      <div className="flex justify-center mt-6">
        <div className="join">
          <button
            className=""
            onClick={() => setPage(page - 1)}
            disabled={page === 1}>
            <FaArrowLeft className="mx-2" />
          </button>

          {Array.from({ length: totalPages || 0 }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={` mx-2 ${
                  pageNum === page
                    ? "bg-[#B13BFF] text-white btn btn-xs"
                    : "btn btn-outline hover:bg-[#B13BFF] hover:text-white btn-xs"
                }`}>
                {pageNum}
              </button>
            )
          )}
          <button
            className=""
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}>
            <FaArrowRight className="mx-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseBook;
