import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const Login = () => {
  const { login } = useAuth();
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
    const res = await axiosSecure.post("/user/login", userData);
    login(res.data.token, res.data.user);
    console.log(res.data.user.id);
    if (res.data.user.id) {
      navigate(`${location?.state?.from ? location?.state?.from : "/"}`);
    }
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
                //   defaultValue={demoEmail}
                {...register("email", { required: true })}
                className="input outline-none w-full shadow-xl"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-xs text-red-500">Email is required</span>
              )}
              <label className="label text-white">Password</label>
              <input
                type="password"
                //   defaultValue={demoPass}
                {...register("password", { required: true })}
                className="input outline-none w-full shadow-xl"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  Password is required
                </span>
              )}
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
              // onClick={handleLoginAsAdmin}
              className="btn bg-[#471396] border-[#e5e5e5] text-white mt-4">
              Demo Login as Admin
            </button>
            <button
              // onClick={handleLoginAsManager}
              className="btn bg-[#471396] border-[#e5e5e5] text-white mt-4">
              Demo Login as Manager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
