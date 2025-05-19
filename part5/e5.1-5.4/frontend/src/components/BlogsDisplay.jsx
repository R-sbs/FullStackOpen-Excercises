import React, { useEffect, useState } from "react";
import blogservice from "../services/blog";
const BlogsDisplay = ({ blogs }) => {
  const [blogsList, setBlogsList] = useState(null);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure to delete ? ");
    if (confirmed) {
      const res = await blogservice.deleteBlog(id);
      if (res.status === 204) {
        setBlogsList((prev) => prev.filter((blog) => blog.id !== id));
      }
    }
  };
  useEffect(() => {
    setBlogsList(blogs);
  }, [blogs]);
  return (
    blogsList && (
      <div className="my-8">
        <ul>
          {blogsList.map((blog) => {
            return (
              <li
                key={blog.id}
                className="flex gap-4 justify-between items-baseline"
              >
                <a href={blog.url} target="_blank">
                  <h3>{blog.title}</h3>
                </a>

                <p className="text-xs">Authored By : {blog.author}</p>
                <div
                  className="text-sm text-red-500 cursor-pointer hover:underline underline-offset-1"
                  onClick={(e) => handleDelete(e, blog.id)}
                >
                  Delete
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default BlogsDisplay;
