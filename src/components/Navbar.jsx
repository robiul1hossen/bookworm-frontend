import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  // if (isAuthenticated) {
  //   axios
  //     .get("http://localhost:3000/user")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }
  // console.log(isAuthenticated);
  const handleLogout = () => {
    logout();
  };
  const links = (
    <>
      <NavLink to="/">
        <li className="font-semibold mx-2">Home</li>
      </NavLink>
      <NavLink to="/all-books">
        <li className="font-semibold mx-2">All Books</li>
      </NavLink>
      <NavLink to="/about">
        <li className="font-semibold mx-2">About</li>
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/auth/login">
            <button onClick={handleLogout} className="font-semibold mx-2">
              {" "}
              Logout
            </button>
          </NavLink>
          {/* <img
            src={user?.photoURL}
            alt=""
            className="w-8 h-8 rounded-full cursor-pointer"
            referrerPolicy="no-referrer"
          /> */}
        </>
      ) : (
        <>
          <NavLink to="/auth/login">
            <li className="font-semibold mx-2">Login</li>
          </NavLink>
          <NavLink to="/auth/register">
            <li className="font-semibold mx-2">Register</li>
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <a className="text-xl">BOOKWORMS</a>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {/* <a className="btn">Button</a> */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
