import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const { login } = useAuth();
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPass, setDemoPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axiosSecure.post("/user/login", userData);
      login(res.data.token, res.data.user);
      if (res.data.user.id) {
        navigate(`${location?.state?.from ? location?.state?.from : "/"}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleLoginAsAdmin = () => {
    setDemoEmail("admin@gmail.com");
    setDemoPass("123456aA");
  };
  const handleLoginAsUser = () => {
    setDemoEmail("user@gmail.com");
    setDemoPass("123456aA");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">Login Now!</h2>
        <div className="px-6 md:px-20 min-h-screen">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label text-white">Email</label>
              <input
                type="email"
                defaultValue={demoEmail}
                placeholder="Email"
                className="input outline-none w-full shadow-xl"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">Email is required</span>
              )}
              <div className="relative">
                <label className="label text-white">Password</label>
                <input
                  type={showPassword === true ? "text" : "password"}
                  defaultValue={demoPass}
                  placeholder="Password"
                  className="input outline-none w-full shadow-xl"
                  {...register("password", { required: true })}
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
              <button className="btn bg-[#471396] border-[#e5e5e5] text-white mt-4 w-full">
                Login
              </button>
            </fieldset>
            <p>
              New to this website? Please{" "}
              <Link to="/auth/register" className="text-[#B13BFF]">
                Sign Up
              </Link>
            </p>
          </form>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <button
              onClick={handleLoginAsAdmin}
              className="btn bg-white shadow-sm mt-4">
              Demo Login as Admin
            </button>
            <button
              onClick={handleLoginAsUser}
              className="btn bg-white shadow-sm mt-4">
              Demo Login as User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
