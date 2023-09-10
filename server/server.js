const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;

const dotenv = require("dotenv");
const characterRouter = require("./routes/characterRoutes");
dotenv.config();

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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
