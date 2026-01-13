import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../../components/BookCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MyLibrary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["want-to-read", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/want-to-read?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure
      .get(`/currently-reading?email=${user.email}`)
      .then((res) => {
        setReading(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, user]);
  console.log(reading);
  useEffect(() => {
    axiosSecure
      .get(`/read?email=${user.email}`)
      .then((res) => {
        setRead(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, user]);

  return (
    <div className="px-4">
      <Tabs>
        <TabList>
          <Tab>Want To Read</Tab>
          <Tab>Currently Reading</Tab>
          <Tab>Read</Tab>
        </TabList>

        <TabPanel>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
            {books.map((book) => (
              <BookCard key={book._id} book={book?.bookData} />
            ))}

            {!isLoading && books.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No books found
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
            {reading.map((book) => (
              <BookCard key={book._id} book={book?.bookData} />
            ))}

            {!isLoading && books.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No books found
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
            {read.map((book) => (
              <BookCard key={book._id} book={book?.bookData} />
            ))}

            {!isLoading && books.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No books found
              </p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MyLibrary;
