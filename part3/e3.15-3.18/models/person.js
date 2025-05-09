import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URI;

console.log(`connecting to ${url}...`); 

mongoose
  .connect(url)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error Connecting to DB", error.message));

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: Number,
  },
  { timestamps: true }
);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema);


export default Person;
