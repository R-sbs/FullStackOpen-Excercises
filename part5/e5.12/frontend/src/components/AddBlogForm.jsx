import React, { useState } from "react";
import blogService from "../services/blog.js";

const AddBlogForm = ({ updateBlogs, showNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if(!title || !author || !url ){
        showNotification('Fields cannot be empty', 'error');
        return;
    }

    const newBlog = { title, author, url };

    try {
      const addBlogFn = async (newb) => {
        const res = await blogService.addBlog(newb);
        if (res) {
          setTitle("");
          setAuthor("");
          setUrl("");
          updateBlogs(res);
        }
      };

      addBlogFn(newBlog);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold">Add Blog</h2>
      <form onSubmit={handleSubmit} className="my-8">
        <p className="flex items-center justify-between gap-2">
          <label htmlFor="title" className="flex-1/6">
            Title{" "}
          </label>
          <input
            type="text"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p className="flex items-center justify-between gap-2">
          <label htmlFor="author" className="flex-1/6">
            Author{" "}
          </label>
          <input
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6"
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
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 flex-5/6"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </p>
        <button type="submit" className="mt-6">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;

