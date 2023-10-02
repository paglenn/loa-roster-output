const express = require("express");
const path = require("path");
const cors = require("cors");
const characterRouter = require("./routes/characterRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/character", characterRouter);
app.use("/api/user", userRouter);
// 404 error for unrecognized route

// in production mode, serve the html
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  app.use("/", express.static(path.join(__dirname, "../client/public")));
} else {
  app.get("/api/", (req, res) => {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.send("ready to serve");
  });
}
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
