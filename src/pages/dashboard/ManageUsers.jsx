import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleUpdateRole = (event, id) => {
    const role = event.target.value;
    axiosSecure
      .patch(`/user/role/${id}`, { role })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Role Updated!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>CreatedAt</th>
            <th>Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>
                {
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user.photoURL}
                    alt=""
                  />
                }
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td> {moment(user.createdAt).format("DD MMM YYYY")}</td>
              <td>{user?.role?.toUpperCase()}</td>
              <td>
                <div className="">
                  <select
                    onChange={(e) => handleUpdateRole(e, user._id)}
                    value={user?.role || ""}
                    className="select w-1/2 outline-none">
                    <option disabled>Pick a Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
