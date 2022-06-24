/** Destruct environment variable to get database configuration */
require("dotenv").config();
const path = require("path");
const DB_TEST_FILE_PATH = path.join(__dirname, "../db/test.sqlite");
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    ssl: true,
  },
  test: {
    storage: DB_TEST_FILE_PATH,
    logging: false,
    dialect: "sqlite",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
