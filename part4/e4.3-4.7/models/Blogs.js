import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minLenght: 4 },
    author: String,
    url: String,
    likes: Number
}, { timestamps: true})

blogSchema.set('toJSON', {
    transform: ( document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;