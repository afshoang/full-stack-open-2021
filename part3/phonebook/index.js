const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

morgan.token('type', function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :type')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-3-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  const foundPerson = persons.find((person) => person.id === id);

  if (!foundPerson) {
    res.status(404).json({ error: 'Not found person' });
  } else {
    res.json(foundPerson);
  }
});

// Generate id for post request
const generateId = () => {
  return Math.floor(Math.random() * 100);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const { name, number } = body;

  // number or name is missing
  if (!number || !name) {
    return res.status(400).json({ error: 'The name or number is missing' });
  }

  const foundPerson = persons.find((person) => person.name === name);
  // name is existed
  if (foundPerson) {
    return res
      .status(400)
      .json({ error: `${name} already exists in the phonebook` });
  }

  const newPerson = {
    name,
    number,
    id: generateId(),
  };
  persons = [...persons, newPerson];
  res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  const foundPerson = persons.find((person) => person.id === id);

  if (!foundPerson) {
    res.status(400).end();
  } else {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  }
});

app.get('/info', (req, res) => {
  const numberOfPersons = persons.length;
  const timeNow = new Date();
  res.send(
    `<p>Phonebook has info for ${numberOfPersons} people</p><p>${timeNow}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
