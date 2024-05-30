const express = require("express");
const app = express();
require("dotenv").config();

const Contact = require("./modules/phonebook");

let phonebook = [];

app.use(express.static("dist"));
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method, response.method);
  console.log("Path:  ", request.path, response.path);
  console.log("Body:  ", request.body, response.body);
  console.log("---");
  next();
};

const cors = require("cors");

app.use(cors());

app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (req, res,next) => {
  Contact.find({}).then((result) => {
    res.json(result);
  }).catch(error=>next(error));
});

app.get("/info", (req, res, next) => {
  Contact.find({})
    .then((result) => {
      res.send(
        `<p> Phonebook has info for ${
          result.length
        } people </p> <br/> <p> ${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.status(500).end();
    });
});
app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const contact = {
    name: body.name,
    number: body.number,
  };
  console.log(req.params.id);
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updated) => {
      console.log(updated);
      res.json(updated);
    })
    .catch((error) => next(error));
});
app.post("/api/persons", (req, res,next) => {
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
  }).catch(error=>next(error));
});
app.use(unknownEndpoint);

app.use((error, req, res, next) => {
  if (error.name === "CastError") {
    console.log(error.message);
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
