import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true, minLenght: 4 },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
