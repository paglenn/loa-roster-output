const express = require("express");
const characterRouter = require("./routes/characterRoutes");
const app = express();

app.use(express.json());
app.use("/character", characterRouter);

// 404 error for unrecognized route
app.use((req, res) => {
  res.status(404).send("Not found");
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

module.exports = app;
