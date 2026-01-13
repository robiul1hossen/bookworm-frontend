import { NavLink, Outlet } from "react-router";
import { BiSolidCategory } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { FaHome, FaUsers, FaVideo } from "react-icons/fa";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="drawer lg:drawer-open px-4">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarRightCollapseFilled size={20} />
          </label>
          <div className="flex justify-between items-center w-full list-none">
            <div className="px-4 font-bold text-xl md:text-2xl">BOOKWORM</div>
            <div className="flex pr-4">
              {user ? (
                <div className="flex items-center">
                  <NavLink to="/auth/login">
                    <button
                      onClick={handleLogout}
                      className="font-semibold mx-2 cursor-pointer">
                      {" "}
                      Logout
                    </button>
                  </NavLink>
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-8 h-8 rounded-full cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </div>
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
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage">
                  {/* Home icon */}
                  <span className="flex items-center justify-center gap-1">
                    <FaHome size={16} />
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </span>
                </button>
              </NavLink>
            </li>
            {user?.role === "admin" ? (
              <>
                <li>
                  <NavLink to="/admin/manage-genres">
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Genres">
                      <span className="flex items-center justify-center gap-1">
                        <BiSolidCategory size={16} />
                        <span className="is-drawer-close:hidden">
                          Manage Genres
                        </span>
                      </span>
                    </button>
                  </NavLink>
                </li>
                <li className="">
                  <div className="collapse collapse-arrow bg-base-200 rounded-none">
                    <input type="checkbox" />

                    <div className="collapse-title p-0">
                      <NavLink
                        to="/admin/manage-books"
                        className="flex items-center gap-2 w-full">
                        <IoBookSharp size={16} />
                        <span className="is-drawer-close:hidden">
                          Manage Books
                        </span>
                      </NavLink>
                    </div>

                    <div className="collapse-content p-0">
                      <ul className="ml-4 space-y-1">
                        <li>
                          <NavLink
                            to="/admin/manage-books"
                            className="block px-3 py-1 text-sm hover:text-primary">
                            📚 All Books
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/admin/manage-books/create"
                            className="block px-3 py-1 text-sm hover:text-primary">
                            ➕ Create Book
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/admin/manage-books/drafts"
                            className="block px-3 py-1 text-sm hover:text-primary">
                            📝 Draft Books
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* List item */}
                <li>
                  <NavLink to="/admin/moderate-reviews">
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Moderate Reviews">
                      <span className="flex items-center justify-center gap-1">
                        <MdReviews size={16} />
                        <span className="is-drawer-close:hidden">
                          Moderate Reviews
                        </span>
                      </span>
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-tutorials">
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Tutorials">
                      <span className="flex items-center justify-center gap-1">
                        <FaVideo size={16} />
                        <span className="is-drawer-close:hidden">
                          Manage Tutorials
                        </span>
                      </span>
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-users">
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="User Management">
                      <span className="flex items-center justify-center gap-1">
                        <FaUsers size={16} />
                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </span>
                    </button>
                  </NavLink>
                </li>
              </>
            ) : (
              <div>
                <NavLink to="/user/browse-book" className="cursor-pointer">
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Browse Book">
                    <span className="flex items-center justify-center gap-1">
                      <FaUsers size={16} />
                      <span className="is-drawer-close:hidden">
                        Browse Book
                      </span>
                    </span>
                  </button>
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
