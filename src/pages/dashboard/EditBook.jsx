import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [allGenres, setAllGenres] = useState([]);

  const { data: book = {} } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = axiosSecure.get(`/books/${id}`);
      return (await res).data;
    },
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
  const newAllGenres = allGenres.map((genre) => genre.name);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedGenres = watch("genres") || [];
  //   console.log(book);
  const { title, author, description, price, year, coverImage } = book;
  const handleEdit = (data) => {
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
        .patch(`/books/${id}`, bookData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center my-4">
          Update {book.title}
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(handleEdit)}>
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-5 px-4">
              <div>
                <label className="label">Title</label>
                <input
                  defaultValue={title}
                  {...register("title", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm"
                  placeholder="Type here"
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    Title is required
                  </span>
                )}
              </div>
              <div>
                <label className="label">Author</label>
                <input
                  defaultValue={author}
                  {...register("author", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm"
                  placeholder="Type here"
                />
                {errors.author && (
                  <span className="text-xs text-red-500">
                    Author is required
                  </span>
                )}
              </div>
              <div>
                <label className="label">Description</label>
                <input
                  defaultValue={description}
                  {...register("description", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm"
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
                  defaultValue={price}
                  {...register("price", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm"
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
                  defaultValue={year}
                  {...register("year", { required: true })}
                  type="text"
                  className="input outline-none shadow-sm"
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
                  className="file-input file-input-primary outline-none shadow-sm "
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
            <div className="grid grid-cols-2 gap-2 px-4">
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
          <div className="px-4 mt-6">
            <button className="btn btn-primary">Edit Book Details</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
