const express = require("express");
const path = require("path");
const requestLogger = require("./middleware/logger");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const healthRoutes = require("./routes/health");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(requestLogger);

app.get("/api", (req, res) => {
  res.json({ message: "DevOps Portfolio API is running." });
});

app.use("/api", healthRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
