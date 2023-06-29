const express = require('express');
const app = express() ;

// controller 
const characterController = require('./controllers/characterController');

app.use(express.json() );

// GET request to root returns all characters 
app.get('/characters', characterController.getCharacters,(req, res) => {
  res.status(200).json(res.locals.characters); 
}); 

app.get('/character', characterController.getCharacter,(req, res) => {
  res.status(200).json(res.locals.character); 
}); 

// handle post requests to create new character 
app.post('/character',characterController.createCharacter, (req, res) => {
  res.status(200).json(res.locals.character); 
}); 

// handle patch requests to update character 
app.patch('/character', characterController.updateCharacter,(req, res) => {
  res.status(200).json(res.locals.character); 
}); 

// handle delete requests to delete an existing character 
app.delete('/character',characterController.deleteCharacter,  (req, res) => {
  res.status(200).json(res.locals.character); 
}); 

// 404 error for unrecognized route 
app.use((req, res) => {
  res.status(404).send("Not found");
} )

// global error handler 
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({error: err})

})

app.listen(3000, () => {console.log('listening on port 3000' )});