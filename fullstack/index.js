const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static("dist"));
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/api/persons", (req, res) => {
  res.json(phoneBook);
});
app.get("/info", (req, res) => {
  res.send(
    `<p> Phonebook has info for ${
      phoneBook.length
    } people </p> <br/> <p> ${new Date()}</p>`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const person = phoneBook.filter((n) => Number(n.id) === id);
  if (person.length === 0) {
    res.status(404).end("Error: not found");
  }
  console.log(person);
  res.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBook = phoneBook.filter((n) => n.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(405).end("please fill right");
  }

  const filter = phoneBook.filter((n) => n.name === body.name);
  console.log(filter);
  if (filter.length > 0) {
    return res.status(409).send({ error: "name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * (10000 - 1) + 1),
  };

  phoneBook = phoneBook.concat(person);
  res.json(person);
});

const PORT = process.env.PORT|| 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
