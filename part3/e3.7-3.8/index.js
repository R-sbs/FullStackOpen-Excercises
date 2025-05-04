import express, { json } from "express";
import morgan from "morgan";

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

app.use(express.static('dist'));
app.use(json());

//  morgan is a logging library to use with nodeJS Servers, mainly used for logging important information(tokens( in-built or custom)) into the console.
//  How this works : 1. Install morgan 2. pass morgan function as middleware. this function takes predefined arguments like 'dev', 'combined' etc.
//  3. Other than predefined arguments, this function can take tokens, which also can be in-built or custom
//  4. Here One wants to log the request info like method, endpoint, status, response-time, request body into the console. Each piece of info is considered as tokens.
//  5. Each token used here is built except body token, which is custom.

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
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Person Not Found");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).send("Person Does't Exists");
  }
});

app.post("/api/persons", (req, res) => {
  function generateId() {
    return Math.floor(Math.random() * 1000);
  }
  const id = generateId();
  const name = req.body.name || null;
  const number = req.body.number || null;

  if (!name || !number) {
    return res.status(400).json({ error: "Missing name or number" });
  }
  const nameExistsAlready = persons.find((person) => person.name === name);
  if (nameExistsAlready) {
    return res
      .status(400)
      .json({ error: `${name} already exists in phonebook` });
  }

  const newPerson = { id, name, number };
  // console.log(newPerson)

  persons = persons.concat(newPerson);
  console.log(persons);

  return res
    .status(201)
    .json({ message: `${newPerson.name} is successfully created` });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
