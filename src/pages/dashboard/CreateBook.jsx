import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { toast } from "react-toastify";

const CreateBook = () => {
  const axiosSecure = useAxiosSecure();
  const [allGenres, setAllGenres] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const selectedGenres = watch("genres") || [];

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
  const newAllGenres = allGenres.map((genre) => genre.name);

  const handleAdd = (data) => {
    console.log(data);
    const profileImage = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImage);
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_host_image
    }`;

    axios.post(imageHostingURL, formData).then((res) => {
      const thumbnailURL = res.data?.data?.url;
      console.log(thumbnailURL);

      const bookData = {
        title: data.title,
        author: data.author,
        description: data.description,
        price: Number(data.price),
        year: data.year,
        coverImage: thumbnailURL,
        genres: data.genres,
      };

      axiosSecure
        .post("/books", bookData)
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            toast.success("Book added to list.");
          }
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center my-4">Add a Book</h2>
      </div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(handleAdd)}>
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4">
              <div className="w-full">
                <label className="label">Title</label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm w-full"
                  placeholder="Type here"
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    Title is required
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="label">Author</label>
                <input
                  {...register("author", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm w-full"
                  placeholder="Type here"
                />
                {errors.author && (
                  <span className="text-xs text-red-500">
                    Author is required
                  </span>
                )}
              </div>
              <div className="">
                <label className="label">Description</label>
                <input
                  {...register("description", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm w-full"
                  placeholder="Type here"
                />
                {errors.description && (
                  <span className="text-xs text-red-500">
                    Description is required
                  </span>
                )}
              </div>
              <div>
                <label className="label">Price</label>
                <input
                  {...register("price", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm w-full"
                  placeholder="Type here"
                />
                {errors.price && (
                  <span className="text-xs text-red-500">
                    Price is required
                  </span>
                )}
              </div>
              <div>
                <label className="label">Year</label>
                <input
                  {...register("year", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm w-full"
                  placeholder="Type here"
                />
                {errors.year && (
                  <span className="text-xs text-red-500">Year is required</span>
                )}
              </div>
              <div className="">
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-primary outline-none shadow-sm w-full"
                />
                {errors.photo && (
                  <span className="text-xs text-red-500">
                    Photo is required
                  </span>
                )}
              </div>
            </div>
          </fieldset>
          <div>
            <p className="px-4 textarea-sm">Select Genres</p>
            <div className="grid grid-cols-2 gap-2 px-4 w-full">
              {newAllGenres.map((genre, i) => (
                <label className="label" key={i}>
                  <input
                    value={genre}
                    {...register("genres", {
                      validate: (value) =>
                        value.length <= 2 || "You can select maximum 2 genres",
                    })}
                    disabled={
                      selectedGenres.length >= 2 &&
                      !selectedGenres.includes(genre)
                    }
                    type="checkbox"
                    className="checkbox"
                  />

                  {errors.genres && (
                    <span className="text-xs text-red-500 mt-2">
                      {errors.genres.message}
                    </span>
                  )}
                  {genre}
                </label>
              ))}
            </div>
          </div>
          <div className="px-4 my-6">
            <button className="btn bg-white shadow-sm">Add A Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
