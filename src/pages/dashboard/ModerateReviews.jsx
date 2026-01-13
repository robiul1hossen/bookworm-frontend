import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";

const ModerateReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("books/reviews");
      return res.data;
    },
  });
  const handleApprove = async (review) => {
    const info = {
      bookId: review.bookId,
      userEmail: review.email,
      reviewDate: review.date,
    };
    await axiosSecure.patch(`/reviews/approve`, info).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Review Approved");
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Review Text</th>
            <th>Date</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {reviews?.map((review, i) => (
            <tr key={review._id}>
              <th>{i + 1}</th>
              <td>{review.name}</td>
              <td className="w-1/3">{review.comment}</td>
              <td>{moment(review.date).format("DD MM YYYY")}</td>
              <td>{review.status}</td>
              <td className="">
                <span className="flex items-center gap-1">
                  {review.rating}
                  <FaStar fill="#ff9900" stroke="#ff9900" />
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleApprove(review)}
                  className="btn bg-white shadow-sm rounded-lg">
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModerateReviews;
