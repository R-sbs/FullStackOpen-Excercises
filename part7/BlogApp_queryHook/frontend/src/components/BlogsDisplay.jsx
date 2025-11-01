import React, { useEffect, useRef, useState } from "react";
import blogservice from "../services/blog";
import { notify } from "./Notification";
import { useNotification } from "../contexts/notification";
import { Link } from "react-router-dom";
import Toggalable from "./Toggalable";
import AddBlogForm from "./AddBlogForm";

const BlogsDisplay = ({ blogs, setBlogs }) => {
  const { dispatch } = useNotification();
  const blogFormRef = useRef();

  const AddNewBlog = (newBlog) => {
    setBlogs((prev) => [...prev, newBlog]);
    notify(dispatch, "New Blog Has been Successfully added", "success");
    blogFormRef.current.toggleVisibility();
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure to delete ? ");
    if (confirmed) {
      const res = await blogservice.deleteBlog(id);
      if (res.status === 204) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        notify(dispatch, "Successfully Deleted", "success");
      } else if (res.status === 401) {
        notify(dispatch, "Unauthorized", "error");
      }
    }
  };

  const handleLiked = async (blog) => {
    const updatedObj = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    const returnedBlog = await blogservice.updateLikes(updatedObj, blog.id);
    if (returnedBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === returnedBlog.id ? returnedBlog : blog
      );
      setBlogs(updatedBlogs);
    }
  };

  const handleAZSort = () => {
    const sorted = [...blogs].sort((a, b) => a.title.localeCompare(b.title));
    setBlogs(sorted);
  };

  const handleLikesSort = () => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sorted);
  };

  const handleReset = async () => {
    try {
      const allBlogs = await blogservice.getAll();
      setBlogs(allBlogs);
    } catch (err) {
      console.error("Error resetting blogs:", err);
      notify(dispatch, "Failed to reset blogs", "error");
    }
  };

  if (!blogs || blogs.length === 0) {
    return <p className="my-4 text-gray-500">No Blogs to Display</p>;
  }
  return (
    <div className="my-8">
      <div className="w-full flex justify-between my-4">
        <h2 className="text-2xl font-semibold font-mono">Saved Blogs</h2>
        <div className="flex gap-4 justify-center items-center my-1">
          <h5 className="bg-black/60 rounded-sm text-white p-1 px-2">
            Sort By
          </h5>
          <button
            className="bg-white! text-gray-800! p-0.5! px-1! active:invert hover:underline"
            onClick={handleAZSort}
          >
            A-Z &darr;
          </button>
          <button
            className="bg-white! text-gray-800! p-0.5! px-1!  active:invert hover:underline"
            onClick={handleLikesSort}
          >
            Most likes &darr;
          </button>
          <button
            className="bg-white! text-gray-800! p-0.5! px-1!  active:invert hover:underline"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <Toggalable buttonLabel="Add New Blog" ref={blogFormRef}>
          <AddBlogForm updateBlogs={AddNewBlog} />
        </Toggalable>
      </div>
      <table className="table-auto w-full border">
        <thead className="bg-blue-200 ">
          <tr className="font-medium">
            <th className="p-4">Title</th>
            <th>Authored By</th>
            <th>URL</th>
            <th>Likes</th>
            <th>DEL</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 &&
            blogs.map((blog) => {
              console.log(blog.url);
              return (
                <tr key={blog.id} className="border p-2">
                  <td>
                    {" "}
                    <Link to={`/blogs/${blog.id}`} className="flex-1">
                      <h3>{blog.title}</h3>
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <p className="text-sm">{blog.author}</p>
                  </td>
                  <td>
                    <a href={blog.url} target="_blank" className="underline!">
                      GO
                    </a>
                  </td>
                  <td>
                    {" "}
                    <div className="p-2">
                      {blog.likes}{" "}
                      <button
                        className="p-1  bg-green-600 px-4 text-gray-100 rounded-md"
                        onClick={() => handleLiked(blog)}
                      >
                        like
                      </button>{" "}
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div
                      className="text-sm text-red-500 cursor-pointer hover:underline underline-offset-1"
                      onClick={(e) => handleDelete(e, blog.id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsDisplay;
