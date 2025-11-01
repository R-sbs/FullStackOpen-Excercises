import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBlogById } from "../services/blog";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/users";
import BlogCommentForm from "../components/BlogCommentAddForm";
import BlogComments from "../components/BlogComments";

const SingleBlogPage = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(blog.user),
    enabled: !!blog,
  });

  if (isLoading || isUserLoading) return <p>Loading...</p>;
  if (isError || isUserError) return <p>Some Error Occured</p>;

  console.log(blog);

  return (
    <div>
      <h2 className="text-lg font-semibold">Blog Details</h2>
      <p>
        Title of the Blog :<span className="font-semibold"> {blog.title}</span>
      </p>
      <p>
        Author: <span className="font-semibold">{blog.author}</span>
      </p>
      <p>Total Likes: {blog.likes}</p>
      {user && <p>Added By :{user.name} </p>}
      <div className="my-12">
        <h3 className="font-semibold text-lg my-2">Comments</h3>
        <BlogCommentForm blogId={blog.id} />
        <BlogComments comments={blog.comments} />
      </div>
    </div>
  );
};

export default SingleBlogPage;
