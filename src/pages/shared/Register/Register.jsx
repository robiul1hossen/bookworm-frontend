import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      photo: "photo",
      password: data.password,
    };
    console.log(userInfo);
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
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input outline-none w-full shadow-xl "
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
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
