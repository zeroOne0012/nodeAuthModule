require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 30000,
  max: 10,
});

module.exports = pool;
