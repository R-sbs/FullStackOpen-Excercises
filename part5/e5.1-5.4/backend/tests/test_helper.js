import Blog from "../models/Blogs.js";
import User from "../models/User.js";

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
];

const initialUsers = [
  {
    name: "Ranjan",
    username: "ranjanm",
    password: "ranjanm123",
  },
  {
    name: "chandan",
    username: "chandanm",
    password: "chandanm123",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  const result = blogs.map((blog) => blog.toJSON());
  return result;
};

const usersInDb = async () => {
  const users = await User.find({});
  console.log(users)
  return users.map(u => u.toJSON());
};

export default {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
};
