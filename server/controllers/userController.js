const User = require("../database/models/userModel");
const userController = {};

const authError = {
  message: "Error: invalid email or password",
};
userController.createUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  // check if user already exists
  if (
    (await User.findOne({ email: email })) ||
    (username && (await User.findOne({ username: username })))
  ) {
    // then user already exists
    res.locals.user = { auth: false };
    return next();
  }

  // if user doesn't exist create them \o/
  try {
    const user = await User.create({
      email: email,
      username: username ?? email,
      password: password,
    });

    res.locals.user = { username: user.username, auth: true };
  } catch (err) {
    return next({
      ...authError,
      log: "Error occurred in createUser middleware",
      status: 409,
      error: err,
    });
  }

  return next();
};

userController.authUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.locals.auth = { auth: false };
      return next();
    }
    const username = user.username;
    const region = user.region;
    const auth = await user.matchPassword(password);
    res.locals.auth = { auth: auth };
    res.locals.user = {
      username: username,
      region: region,
      ...res.locals.auth,
    };
  } catch (err) {
    return next({
      ...authError,
      log: "Error in authUser Middleware",
      status: 401,
      error: err,
    });
  } finally {
    return next();
  }
};

userController.checkAdmin = async (req, res, next) => {
  const { secret } = req.body;
  res.locals.auth = { isAdmin: process.env.ADMIN_SECRET === secret };
  return next();
};

module.exports = userController;
