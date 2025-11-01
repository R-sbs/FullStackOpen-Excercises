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
  const { dispatch } = useNotification();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    fetchAll();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-20 w-full">
        <main className="flex-2/3">
          {blogs && <BlogsDisplay blogs={blogs} setBlogs={setBlogs} />}
        </main>
      </div>

      <div className="fixed right-2 bottom-2"></div>
    </>
  );
};

export default HomePage;
