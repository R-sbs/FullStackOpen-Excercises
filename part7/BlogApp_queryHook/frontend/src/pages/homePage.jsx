import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import AddBlogForm from "../components/AddBlogForm.jsx";
import BlogsDisplay from "../components/BlogsDisplay.jsx";
import Logout from "../components/Logout.jsx";
import { notify } from "../components/Notification.jsx";
import Toggalable from "../components/Toggalable.jsx";
import { useUser } from "../hooks/useUser.js";
import blogService from "../services/blog.js";
import { useNotification } from "../contexts/notification.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useUser();
  const { dispatch } = useNotification();
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = React.useRef();

  const AddNewBlog = (newBlog) => {
    setBlogs((prev) => [...prev, newBlog]);
    notify(dispatch, "New Blog Has been Successfully added", "success");
    blogFormRef.current.toggleVisibility();
  };

  useEffect(() => {
    const fetchAll = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    fetchAll();
  }, []);

  return (
    <>
      <div className="w-full my-4 flex justify-between items-center">
        <div className="text-start">
          <h2 className="text-3xl font-semibold">
            Hi <span className="">{user && user.name}</span>, Welcome to{" "}
            <span className="text-blue-500">Blog Buddy</span>
          </h2>
          <p>Add the blogs you like and read them whenever you want.</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            to="/users"
            className="border p-1 px-4 rounded-sm hover:bg-black hover:text-white"
          >
            Users
          </Link>

          <Toggalable buttonLabel="Add New Blog" ref={blogFormRef}>
            <AddBlogForm updateBlogs={AddNewBlog} />
          </Toggalable>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-20 w-full">
        <main className="flex-2/3">
          <h2 className="text-2xl font-semibold">
            {blogs && blogs.length === 0
              ? "No Blogs to Display"
              : "Saved Blogs"}
          </h2>
          {blogs && <BlogsDisplay blogs={blogs} setBlogs={setBlogs} />}
        </main>
      </div>

      <div className="fixed right-2 bottom-2">
        <Logout />
      </div>
    </>
  );
};

export default HomePage;
