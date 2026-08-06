function requestLogger(req, res, next) {
  const { method, originalUrl } = req;
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`${method} ${originalUrl} ${res.statusCode} - ${duration.toFixed(2)}ms`);
  });

  next();
}

module.exports = requestLogger;
