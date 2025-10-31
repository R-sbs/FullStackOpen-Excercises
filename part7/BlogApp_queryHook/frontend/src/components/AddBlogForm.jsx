import React, { useState } from "react";
import blogService from "../services/blog.js";
import { notify } from "./Notification.jsx";
import { useNotification } from "../contexts/notification.jsx";

const AddBlogForm = ({ updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { dispatch } = useNotification();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !author || !url) {
      notify(dispatch, "Fields cannot be empty", "error");
      return;
    }

    const newBlog = { title, author, url };

    try {
      const res = await blogService.addBlog(newBlog);

      if (res) {
        setTitle("");
        setAuthor("");
        setUrl("");
        updateBlogs(res);
        notify(dispatch, "Blog added successfully!", "success");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      notify(
        dispatch,
        error.response?.data?.error || "Something went wrong",
        "error"
      );
    }
  }

  return (
    <div className="bg-white shadow-md p-8 rounded-sm min-w-lg">
      <h2 className="text-2xl font-semibold">Add Blog</h2>
      <form onSubmit={handleSubmit} className="my-8">
        <p className="flex items-center justify-between gap-2">
          <label htmlFor="title" className="flex-1/6">
            Title{" "}
          </label>
          <input
            type="text"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6 border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p className="flex items-center justify-between gap-2">
          <label htmlFor="author" className="flex-1/6">
            Author{" "}
          </label>
          <input
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6 border"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </p>
        <p className="flex items-center justify-between gap-2">
          <label htmlFor="url" className="flex-1/6 ">
            Blog URL{" "}
          </label>
          <input
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6 border"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </p>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
