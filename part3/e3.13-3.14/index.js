import express, { json } from "express";
import morgan from "morgan";
import Person from "./models/person.js";

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(express.static("dist"));
app.use(json());

//  morgan is a logging library to use with nodeJS Servers, mainly used for logging important information(tokens( in-built or custom)) into the console.

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms | body: :body"
  )
);

app.get("/api/health", (req, res) => {
  res.send("<p>Healthy</p>");
});

app.get("/info", (req, res) => {
  const currentTime = new Date().toLocaleString();
  const info = `Phonebook has info on ${persons.length} people`;
  res.send({ info, currentTime });
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((people) => res.json(people))
    .catch((error) => res.status(400).json(error.message));
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).send("Person Not Found");
  // }

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => res.status(400).send({ error: "MalFormatted Id" }));
});

app.delete("/api/persons/:id", async (req, res) => {
  const { id } = req.params;
  await Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(404).send("Person Does't Exists");
    });
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name || null;
  const number = req.body.number || null;

  if (!name || !number) {
    return res.status(400).json({ error: "Missing name or number" });
  }
  // const nameExistsAlready = persons.find((person) => person.name === name);
  // if (nameExistsAlready) {
  //   return res
  //     .status(400)
  //     .json({ error: `${name} already exists in phonebook` });
  // }

  // const newPerson = { id, name, number };
  // // console.log(newPerson)

  // persons = persons.concat(newPerson);
  // console.log(persons);

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
