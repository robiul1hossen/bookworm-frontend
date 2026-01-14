import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { setToken } from "../../../lib/lib";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImage = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImage);
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_host_image
    }`;
    axios.post(imageHostingURL, formData).then((res) => {
      const userPhotoURL = res.data?.data?.url;

      const upperCase = /(?=.*[A-Z])/;
      const lowercase = /(?=.*[a-z])/;
      const sixCha = /.{6,}/;

      if (!sixCha.test(data.password)) {
        return toast.error("Password must be at least 6 character");
      }
      if (!lowercase.test(data.password)) {
        return toast.error("Password must be one lowercase");
      }
      if (!upperCase.test(data.password)) {
        return toast.error("Password must be one Uppercase");
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: userPhotoURL,
        password: data.password,
      };
      axiosSecure
        .post("/user/signup", userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.user.id) {
            setToken(res.data.token);
            navigate(`${location?.state?.from ? location?.state?.from : "/"}`);
          }
          console.log(res);
        })
        .catch((error) => console.log(error));
    });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up Now!</h2>
      <div className="px-6 md:px-20 min-h-screen">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input outline-none w-full shadow-xl "
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input outline-none  w-full shadow-xl "
              placeholder="Email"
            />

            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPassword === true ? "text" : "password"}
                {...register("password", { required: true })}
                className="input outline-none w-full shadow-xl "
                placeholder="Password"
              />
              <span
                onClick={() => handleShowPassword(showPassword)}
                className="absolute top-7.5 right-2.5">
                {showPassword === true ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <span className="text-xs text-red-500">
                  Password is required
                </span>
              )}
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="flex-1 w-full">
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-primary outline-none w-full shadow-xl "
                />
                {errors.photo && (
                  <span className="text-xs text-red-500">
                    Photo is required
                  </span>
                )}
              </div>
            </div>
          </fieldset>
          <button className="btn bg-[#471396] border-[#e5e5e5] text-white mt-4 w-full shadow-xl">
            Sign up
          </button>

          <p>
            Already have an account? Please{" "}
            <Link to="/auth/login" className="text-[#B13BFF]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
