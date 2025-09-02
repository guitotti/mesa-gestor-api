export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/db.sqlite",
  },
  useNullAsDefault: true,
  migrations: {
    extensions: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds",
  },
};
