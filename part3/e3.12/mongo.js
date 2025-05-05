import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give name and number as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const uri = `mongodb+srv://m2rmbng:${password}@cluster0.fkvdini.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(uri);

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: Number,
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const newPerson = new Person({ name, number });

  await newPerson.save().then((result) => {
    const printThis = `Added ${result.name} number ${result.number} to the phonebook`;
    console.log(printThis);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("Phonebook : ")
    result.forEach((person) => console.log(`${person.name} - ${person.number}`));
    mongoose.connection.close();
  });
}
