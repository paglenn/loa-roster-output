const express = require("express");
const router = express.Router();
const { createUser, authUser } = require("../controllers/userController");
router.post("/signup", createUser, () => {
  res.json(res.locals.user);
});

router.get("/login", authUser, () => {
  res.json(res.locals.auth);
});
module.exports = router;
