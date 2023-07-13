const express = require('express');
const app = express();
const port = process.env.PORT ?? 8080;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
// controller
const characterController = require('./controllers/characterController');

app.use(express.json());
// get request to root serves html
app.get('/', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
);

app.get('/build/bundle.js', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
);

// GET request to root returns all characters
app.get('/characters', characterController.getCharacters, (req, res) => {
  res.status(200).json(res.locals.characters);
});

app.get('/character', characterController.getCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// handle post requests to create new character
app.post('/character', characterController.createCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// handle patch requests to update character
app.patch('/character', characterController.updateCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// handle delete requests to delete an existing character
app.delete('/character', characterController.deleteCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// 404 error for unrecognized route
app.use((req, res) => {
  res.status(404).send('Not found');
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
