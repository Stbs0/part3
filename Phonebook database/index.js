const express = require("express");
const app = express();
require("dotenv").config();

const Contact = require("./modules/phonebook");

let phonebook = [];

app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/info", (req, res) => {
  Contact.find({}).then((result) => {
    res.send(
      `<p> Phonebook has info for ${
        result.length
      } people </p> <br/> <p> ${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const person = phoneBook.filter((n) => Number(n.id) === id);
  if (person.length === 0) {
    res.status(404).end("Error: not found");
  }

  res.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBook = phoneBook.filter((n) => n.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body === undefined) {
    return res.status(405).end("please fill right");
  }

  console.log(body);
  const person = new Contact({
    name: body.name,
    number: body.number,
  });
  console.log(person);
  person.save().then((result) => {
    res.json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
