import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/users";
import { getBlogById } from "../services/blog";

const SingleUserPage = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  if (!user) return <p>No User Found.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>error...Please try later</p>;

  console.log(user.blogs);

  return (
    <div>
      <h2 className="text-lg font-semibold my-8">User : {user.name}</h2>
      {user.blogs.length > 0 ? (
        <>
          <p className="font-semibold">Added Blogs : </p>
          <ul className="list-decimal w-fit mx-auto">
            {user.blogs.map((blog) => {
              return (
                <li key={blog.id} className="hover:underline text-blue-500">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No Blogs to show</p>
      )}
    </div>
  );
};

export default SingleUserPage;
