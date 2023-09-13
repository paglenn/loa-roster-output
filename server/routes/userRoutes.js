const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
router.post("/user", createUser, () => {
  res.json(res.locals.user);
});
module.exports = router;
