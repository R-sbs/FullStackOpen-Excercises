import React, { useEffect, useState } from "react";
import blogservice from "../services/blog";
const BlogsDisplay = ({ blogs }) => {
  const [blogsList, setBlogsList] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [viewId, setViewId] = useState(null)

  const displayView = { display: detailsVisible ? "" : "none" };

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

  const handleView = (blogId) => {
    setViewId(blogId)
    setDetailsVisible(!detailsVisible);
  };

  const handleLiked = async (blog) => {
    const updatedObj = {...blog, likes: blog.likes + 1 }
        const returnedBlog = await blogservice.updateLikes( updatedObj , blog.id);
        if(returnedBlog) {
          const updatedBlogs = blogsList.map( (blog) => blog.id === returnedBlog.id ? returnedBlog : blog);
          setBlogsList(updatedBlogs)
        }
  }

  const handleAZSort = () => {
    const sorted = [...blogsList].sort( (a , b) => a.title.localeCompare(b.title));
    setBlogsList(sorted)
  }

  const handleLikesSort = () => {
    const sorted = [...blogsList].sort((a, b) => b.likes - a.likes );
    setBlogsList(sorted)
  }

  useEffect(() => {
    setBlogsList(blogs);
  }, [blogs]);

  return (
    blogsList && (
      <div className="my-8">
        <div className="flex gap-4 justify-center items-center my-1">
          <h5>Sort By</h5>
        <button className="bg-white! text-gray-800! p-0.5! px-1! active:invert" onClick={handleAZSort}>A-Z &darr;</button>
        <button className="bg-white! text-gray-800! p-0.5! px-1!  active:invert" onClick={handleLikesSort}>Most likes &darr;</button>
        <button className="bg-white! text-gray-800! p-0.5! px-1!  active:invert" onClick={ () => setBlogsList(blogs)}>Reset</button>
        </div>
        <ul>
          {blogsList.map((blog) => {
            return (
              <li
                key={blog.id}
                className="flex flex-col gap-4 justify-between items-baseline text-left border-b border-neutral-400 p-1"
              >
                <div className="flex flex-row justify-between w-full">
                  <a href={blog.url} target="_blank" className="flex-1">
                    <h3>{blog.title}</h3>
                  </a>

                  <div
                    className="text-sm text-green-500 cursor-pointer hover:underline underline-offset-1 mr-2"
                    onClick={() => handleView(blog.id)}
                  >
                    { detailsVisible &&  blog.id === viewId ? 'hide' : 'View' }
                  </div>
                  <div
                    className="text-sm text-red-500 cursor-pointer hover:underline underline-offset-1"
                    onClick={(e) => handleDelete(e, blog.id)}
                  >
                    Delete
                  </div>
                </div>
                { blog.id === viewId && 
                  <div className="animate-slide-down" style={displayView}>
                    <p className="text-sm">Authored By : {blog.author}</p>
                    <a href={blog.url} target="_blank" className="underline!">
                     URL :  {blog.url}
                    </a>
                    <div>Likes: {blog.likes} <button className="p-0! bg-green-600! px-4! text-gray-800!" onClick={() => handleLiked(blog)}>like</button> </div>
                  </div>
                }
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default BlogsDisplay;
