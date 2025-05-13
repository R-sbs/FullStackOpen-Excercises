import express from 'express'
import Blog from '../models/Blogs.js';

const blogsRouter = express.Router();

blogsRouter.get("/", (req, res) => {
    Blog.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).send("Something went wrong", error);
      });
  });
  
  blogsRouter.post("/", (request, response, next) => {
    const blog = new Blog(request.body);
  
    blog
      .save()
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => next(error));
  });

export default blogsRouter