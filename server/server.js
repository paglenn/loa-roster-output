const express = require("express");
const characterRouter = require("./routes/characterRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/character", characterRouter);
app.use("/user", userRouter);
// 404 error for unrecognized route
app.use((req, res) => {
  res.status(404).send("Not found");
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: "error occured in unknown middleware",
    message: "an error occured",
    status: 500,
  };
  const error = {
    ...defaultError,
    ...err,
  };
  console.log(error.log);
  res.status(500).json({ error: error.message });
});

module.exports = app;
