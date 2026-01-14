import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   const [userStats, setUserStats] = useState([]);
  const { data: shelfBooks = [] } = useQuery({
    queryKey: ["shelf-books-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/shelf-book-count?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(shelfBooks);
  return (
    <div>
      <div className="flex-1 w-full md:w-1/2 h-96 shadow-md">
        <h2 className="font-semibold text-xl text-end">All Books In Shelf</h2>
        <ResponsiveContainer>
          <BarChart data={shelfBooks}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserHome;
