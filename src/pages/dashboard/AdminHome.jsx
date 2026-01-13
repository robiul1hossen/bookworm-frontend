import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
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

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [userStats, setUserStats] = useState([]);
  const { data: genres = [] } = useQuery({
    queryKey: ["genres-stats"],
    queryFn: async () => {
      const res = axiosSecure.get("/genre-stats");
      return (await res).data;
    },
  });
  useEffect(() => {
    const loadUserStats = async () => {
      const res = await axiosSecure.get("/user-register-stats");
      setUserStats(res.data);
    };
    loadUserStats();
  }, [axiosSecure]);
  console.log(userStats);
  return (
    <div className="flex gap-5 px-4 py-5 bg-gray-50 min-h-screen">
      <div className="flex-1 w-full h-96 shadow-md">
        <h2 className="font-semibold text-xl text-end">Books Per Genre</h2>
        <ResponsiveContainer>
          <BarChart data={genres}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex-1 w-full h-96">
        <h2 className="font-semibold text-xl text-end">
          User Registration Per Day
        </h2>
        <ResponsiveContainer>
          <LineChart data={userStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4F46E5"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
