import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
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
              <td></td>
              <td>
                <Link to={`/admin/update/${book._id}`}>
                  <button className="btn btn-xs px-2">
                    <FaEdit size={14} />
                  </button>
                </Link>
                <button className="btn btn-xs px-2">
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
