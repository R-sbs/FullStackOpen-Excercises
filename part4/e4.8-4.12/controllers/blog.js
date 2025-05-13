import express from "express";
import Blog from "../models/Blogs.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res, next) => {
  try {
    const response = await Blog.find({});
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {

  const { id } = req.params;
  try {
    const result = await Blog.findById(id);
    if(result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Not Found")
    }
  } catch (error) {
    next(error);
  }
})

// Blog.find({})
//   .then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((error) => {
//     res.status(400).send("Something went wrong", error);
//   })

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    if (result) {
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

blogsRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
      await Blog.findByIdAndUpdate(id, body);
      const response = await Blog.findById(id); 
      if(response) {
        res.status(200).json(response)
      } else {
        res.status(404).send('Blog not found')
      }


  } catch (error) {
    next(error);
  }
})

blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Blog.findByIdAndDelete(id);
    if(response) {
      res.status(204).send("Deleted Successfully");
    } else {
      res.status(404).send("Id not Available to Delete")
    }
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
