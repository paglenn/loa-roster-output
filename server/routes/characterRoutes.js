const express = require("express");
const characterController = require("../controllers/characterController");
const router = express.Router();

// get all characters - this will need to come with user id for user specific characters
router.get("/characters", characterController.getCharacters, (req, res) => {
  res.status(200).json(res.locals.characters);
});

router.get("/", characterController.getCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

router.post("/", characterController.createCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// character info in request body
router.patch("/", characterController.updateCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

// handle delete requests to delete an existing character
router.delete("/character", characterController.deleteCharacter, (req, res) => {
  res.status(200).json(res.locals.character);
});

module.exports = router;
