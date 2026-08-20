const express = require("express");

const {
  checkMySQL,
} = require("../database/mysql");

const {
  checkPostgreSQL,
} = require("../database/postgres");

const {
  checkMongoDB,
} = require("../database/mongodb");

const router = express.Router();

router.get("/health", async (req, res) => {
  const services = {
    mysql: "DOWN",
    postgresql: "DOWN",
    mongodb: "DOWN",
  };

  try {
    await checkMySQL();
    services.mysql = "UP";
  } catch (error) {
    console.error("MySQL health check failed:", error.message);
  }

  try {
    await checkPostgreSQL();
    services.postgresql = "UP";
  } catch (error) {
    console.error("PostgreSQL health check failed:", error.message);
  }

  try {
    await checkMongoDB();
    services.mongodb = "UP";
  } catch (error) {
    console.error("MongoDB health check failed:", error.message);
  }

  const allHealthy = Object.values(services).every(
    (status) => status === "UP"
  );

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? "UP" : "DEGRADED",
    services,
  });
});

module.exports = router;