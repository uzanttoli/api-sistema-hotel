const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "",
    database: "dadoshoteis",
  },
});

module.exports = knex;
