[1mdiff --git a/.env.example b/.env.example[m
[1mindex df5ab74..56c9288 100644[m
[1m--- a/.env.example[m
[1m+++ b/.env.example[m
[36m@@ -1,3 +1,21 @@[m
 PORT=3000[m
 NODE_ENV=development[m
 APP_NAME=DevOps Portfolio API[m
[32m+[m
[32m+[m[32mMYSQL_HOST=localhost[m
[32m+[m[32mMYSQL_PORT=3307[m
[32m+[m[32mMYSQL_DATABASE=app_db[m
[32m+[m[32mMYSQL_USER=app_user[m
[32m+[m[32mMYSQL_PASSWORD=your_mysql_password[m
[32m+[m
[32m+[m[32mPOSTGRES_HOST=localhost[m
[32m+[m[32mPOSTGRES_PORT=5432[m
[32m+[m[32mPOSTGRES_DATABASE=practice_db[m
[32m+[m[32mPOSTGRES_USER=devuser[m
[32m+[m[32mPOSTGRES_PASSWORD=your_postgres_password[m
[32m+[m
[32m+[m[32mMONGO_HOST=localhost[m
[32m+[m[32mMONGO_PORT=27017[m
[32m+[m[32mMONGO_DATABASE=practice_db[m
[32m+[m[32mMONGO_USER=devuser[m
[32m+[m[32mMONGO_PASSWORD=your_mongo_password[m
\ No newline at end of file[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 60b7f13..98146ec 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -10,7 +10,12 @@[m
     "lint": "eslint .",[m
     "lint:fix": "eslint . --fix"[m
   },[m
[31m-  "keywords": ["node", "express", "api", "portfolio"],[m
[32m+[m[32m  "keywords": [[m
[32m+[m[32m    "node",[m
[32m+[m[32m    "express",[m
[32m+[m[32m    "api",[m
[32m+[m[32m    "portfolio"[m
[32m+[m[32m  ],[m
   "author": "",[m
   "license": "MIT",[m
   "engines": {[m
[36m@@ -18,7 +23,11 @@[m
   },[m
   "dependencies": {[m
     "dotenv": "^16.3.1",[m
[31m-    "express": "^4.18.4"[m
[32m+[m[32m    "express": "^4.18.4",[m
[32m+[m[32m    "mongodb": "^7.5.0",[m
[32m+[m[32m    "mongoose": "^9.9.3",[m
[32m+[m[32m    "mysql2": "^3.23.3",[m
[32m+[m[32m    "pg": "^8.23.0"[m
   },[m
   "devDependencies": {[m
     "eslint": "^8.57.0",[m
[1mdiff --git a/src/routes/health.js b/src/routes/health.js[m
[1mindex d0e647a..a1ba8d5 100644[m
[1m--- a/src/routes/health.js[m
[1m+++ b/src/routes/health.js[m
[36m@@ -1,9 +1,55 @@[m
 const express = require("express");[m
 [m
[32m+[m[32mconst {[m
[32m+[m[32m  checkMySQL,[m
[32m+[m[32m} = require("../database/mysql");[m
[32m+[m
[32m+[m[32mconst {[m
[32m+[m[32m  checkPostgreSQL,[m
[32m+[m[32m} = require("../database/postgres");[m
[32m+[m
[32m+[m[32mconst {[m
[32m+[m[32m  checkMongoDB,[m
[32m+[m[32m} = require("../database/mongodb");[m
[32m+[m
 const router = express.Router();[m
 [m
[31m-router.get("/health", (req, res) => {[m
[31m-  res.json({ status: "ok", uptime: process.uptime() });[m
[32m+[m[32mrouter.get("/health", async (req, res) => {[m
[32m+[m[32m  const services = {[m
[32m+[m[32m    mysql: "DOWN",[m
[32m+[m[32m    postgresql: "DOWN",[m
[32m+[m[32m    mongodb: "DOWN",[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  try {[m
[32m+[m[32m    await checkMySQL();[m
[32m+[m[32m    services.mysql = "UP";[m
[32m+[m[32m  } catch (error) {[m
[32m+[m[32m    console.error("MySQL health check failed:", error.message);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  try {[m
[32m+[m[32m    await checkPostgreSQL();[m
[32m+[m[32m    services.postgresql = "UP";[m
[32m+[m[32m  } catch (error) {[m
[32m+[m[32m    console.error("PostgreSQL health check failed:", error.message);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  try {[m
[32m+[m[32m    await checkMongoDB();[m
[32m+[m[32m    services.mongodb = "UP";[m
[32m+[m[32m  } catch (error) {[m
[32m+[m[32m    console.error("MongoDB health check failed:", error.message);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  const allHealthy = Object.values(services).every([m
[32m+[m[32m    (status) => status === "UP"[m
[32m+[m[32m  );[m
[32m+[m
[32m+[m[32m  res.status(allHealthy ? 200 : 503).json({[m
[32m+[m[32m    status: allHealthy ? "UP" : "DEGRADED",[m
[32m+[m[32m    services,[m
[32m+[m[32m  });[m
 });[m
 [m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/src/server.js b/src/server.js[m
[1mindex e9e1137..00fec7a 100644[m
[1m--- a/src/server.js[m
[1m+++ b/src/server.js[m
[36m@@ -1,6 +1,6 @@[m
 const http = require("http");[m
[31m-const app = require("./app");[m
 const config = require("./config");[m
[32m+[m[32mconst app = require("./app");[m
 [m
 const server = http.createServer(app);[m
 [m
