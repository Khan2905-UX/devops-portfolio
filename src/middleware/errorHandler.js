function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "Not Found" });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const response = {
    error: err.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV === "development") {
    response.details = err.stack;
  }

  res.status(status).json(response);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
