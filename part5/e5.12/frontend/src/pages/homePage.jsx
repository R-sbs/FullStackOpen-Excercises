import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import AddBlogForm from "../components/AddBlogForm.jsx";
import BlogsDisplay from "../components/BlogsDisplay.jsx";
import { getUser } from "../services/login.js";
import Logout from "../components/Logout.jsx";
import Notification from "../components/Notification.jsx";
import Toggalable from "../components/Toggalable.jsx";

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const blogFormRef = React.useRef();

  const AddNewBlog = (newBlog) => {
    setUser((prev) => ({
      ...prev,
      blogs: [...prev.blogs, newBlog],
    }));

    showNotification("New Blog Has been Successfully added", "success");

    blogFormRef.current.toggleVisibility();
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 3000);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setLoggedIn(true);
      const fetchUser = async () => {
        try {
          const user = await getUser(token.id);
          setUser(user);
          console.log(user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };

      fetchUser();
    }
  }, []);

  if (!loggedIn) {
    return (
      <>
        <h1>Blog Application</h1>
        <div className="card my-2">
          <p>
            Login and add the blogs you like and read them whenever you want.
          </p>
          <Toggalable buttonLabel="Login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Toggalable>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-20">
        <h2 className="text-4xl font-semibold">
          Welcome <span>{user && user.name}</span>, to Blog Application
        </h2>
        <p>Add the blogs you like and read them whenever you want.</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-20 w-full">
        <main className="flex-2/3">
          <h2 className="text-2xl font-semibold">
            {user && user.blogs && user.blogs.length === 0
              ? "No Blogs to Display"
              : "Saved Blogs"}
          </h2>
          <BlogsDisplay blogs={user && user.blogs} />
        </main>
        <aside className="flex-1/3">
          <Toggalable buttonLabel="Add New Blog" ref={blogFormRef}>
            <AddBlogForm
              updateBlogs={AddNewBlog}
              showNotification={showNotification}
            />
          </Toggalable>
        </aside>
      </div>
      <div className="fixed top-2 right-2">
        <Logout showNotification={showNotification} />
      </div>
      <Notification message={notification.message} type={notification.type} />
    </>
  );
};

export default HomePage;
