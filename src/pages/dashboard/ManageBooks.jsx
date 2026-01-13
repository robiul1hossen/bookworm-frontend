import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/books", {
        params: {
          page,
          limit: 10,
          search,
        },
      });
      return res.data;
    },
  });
  const totalPages = books.totalPage || 0;
  console.log(books.result);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/books/${id}`);
        if (res.data.deletedCount) {
          refetch();
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <div>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          type="text"
          placeholder="Search books..."
          className="input outline-none text-end"
        />
      </div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genres</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {books?.result?.map((book, i) => (
            <tr key={book._id}>
              <th>{i + 1}</th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                {book.genres.map((g, i) => (
                  <p key={i}>{g}</p>
                ))}
              </td>
              <td>
                {
                  <img
                    src={book.coverImage}
                    className="w-20 h-12 "
                    alt={book.coverImage}
                  />
                }
              </td>
              <td>
                <Link to={`/admin/update/${book._id}`}>
                  <button className="btn btn-xs px-2">
                    <FaEdit size={14} />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-xs px-2">
                  <FaTrash size={14} />
                </button>
                <Link to={`/book/details/${book._id}`}>
                  <button className="btn btn-xs px-2">
                    <FaEye size={14} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ManageBooks;
