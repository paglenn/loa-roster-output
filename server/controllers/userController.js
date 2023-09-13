const User = require("../database/models/userModel");
const userController = {};

const authError = {
  message: "Error: invalid email or password",
};
userController.createUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  // check if user already exists
  if (await User.findOne({ email: email })) {
    // then user already exists -  return error
    return next({
      ...authError,
      log: "Error occurred in createUser middleware",
      status: 409,
      error: "user already exists",
    });
  }

  // if user doesn't exist create them \o/
  res.locals.user = await User.create({
    email: email,
    username: username ?? email,
    password: password,
  });

  return next();
};

userController.authUser = (req, res, next) => {};

module.exports = userController;
