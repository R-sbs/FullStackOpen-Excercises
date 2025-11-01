import express from "express";
import Blog from "../models/Blogs.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res, next) => {
  try {
    const response = await Blog.find({}).populate("user");
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Blog.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

// Blog.find({})
//   .then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((error) => {
//     res.status(400).send("Something went wrong", error);
//   })

blogsRouter.post("/", async (request, response, next) => {
  const decodeToken = jwt.verify(request.token, config.SECRET);
  console.log(decodeToken);

  if (!decodeToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodeToken.id);

  if (!user) {
    return response.status(400).json({ error: "user missing or not valid" });
  }

  const blog = new Blog({ ...request.body, user: user._id });

  try {
    const result = await blog.save();
    if (result) {
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      response.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   })
  //   .catch((error) => next(error));
});

blogsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    await Blog.findByIdAndUpdate(id, body);
    const response = await Blog.findById(id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const response = await Blog.findById(id);

    if (response && response.user.equals(user._id)) {
      const ress = await Blog.deleteOne({ _id: id });
      res.status(204).json("Deleted Successfully");
    } else {
      res.status(401).send("UNAUTHORIZED");
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const { comment } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();
    return res.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
