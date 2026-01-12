import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
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
          {books.map((book, i) => (
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
                <button className="btn btn-xs px-2">
                  <FaEye size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
