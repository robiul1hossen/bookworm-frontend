import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import moment from "moment/moment";

const ManageGenres = () => {
  const axiosSecure = useAxiosSecure();
  const editGenreModalRef = useRef();
  const [selectGenre, setSelectedGenre] = useState({});
  const { data: genres = [], refetch } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axiosSecure.get("/genres");
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm();
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this genre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`genres/${id}`);
        if (res.data.deletedCount) {
          refetch();
        }
        Swal.fire({
          title: "Deleted!",
          text: "Genre has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEditGenre = (genre) => {
    editGenreModalRef.current.showModal();
    setSelectedGenre(genre);
  };
  const handleUpdateGenre = (data) => {
    console.log(data);
    axiosSecure
      .patch(`/genres/${selectGenre._id}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          reset();
          toast.success("Genre updated!");
          editGenreModalRef?.current?.close();
        }
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddGenre = async (data) => {
    const info = {
      name: data.name,
      date: new Date(),
    };
    await axiosSecure
      .post("/genres", info)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Genre added to list.");
          refetch();
          resetAdd();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="justify-items-end ">
        <form onSubmit={handleSubmitAdd(handleAddGenre)} className="flex gap-2">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              className="input outline-none w-full px-2"
              {...registerAdd("name", { required: true })}
            />
            {errorsAdd.name && (
              <span className="text-xs text-red-500">Genre is required</span>
            )}
          </div>
          <div>
            <button type="submit" className="btn bg-white shadow-sm">
              Add Genre
            </button>
          </div>
        </form>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {genres.map((gen, i) => (
              <tr key={gen._id}>
                <th>{i + 1}</th>
                <td>{gen.name}</td>
                <td>{moment(gen?.date).format("DD MM YYYY")}</td>
                <td>
                  <div>
                    <button
                      onClick={() => handleEditGenre(gen)}
                      className="btn bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                      Edit
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(gen._id)}
                    className="btn bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={editGenreModalRef}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Genre</h3>
          <div className="py-4">
            <form
              onSubmit={handleSubmit(handleUpdateGenre)}
              className="flex gap-2">
              <div className="w-full md:w-1/2">
                <input
                  {...register("name", { required: true })}
                  defaultValue={selectGenre?.name}
                  type="text"
                  placeholder="Type Genre"
                  className="input outline-none w-full px-2"
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    Genre is required
                  </span>
                )}
              </div>
              <div>
                <button className="btn bg-white shadow-sm">Update Genre</button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageGenres;
