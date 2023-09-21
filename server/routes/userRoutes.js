const express = require("express");
const router = express.Router();
const { createUser, authUser } = require("../controllers/userController");
router.post("/signup", createUser, (req, res) => {
  res.json(res.locals.user);
});

router.post(
  "/login",
  authUser,
  (req, res) => {
    res.locals.auth ? res.json(res.locals.user) : res.json(res.locals.auth);
  }
);
module.exports = router;
