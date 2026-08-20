require("dotenv").config();
const mysql = require("mysql2/promise");
const { Pool } = require("pg");
const { MongoClient } = require("mongodb");

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const postgresPool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

const mongoClient = new MongoClient(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?authSource=admin`
);

const mongoDb = mongoClient.db(process.env.MONGO_DATABASE);

module.exports = {
  mysqlPool,
  postgresPool,
  mongoClient,
  mongoDb,
};