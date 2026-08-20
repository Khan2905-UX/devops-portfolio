const { Pool } = require("pg");

const postgresPool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

async function checkPostgreSQL() {
  await postgresPool.query("SELECT 1");
}

module.exports = {
  postgresPool,
  checkPostgreSQL,
};