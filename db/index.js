const pgp = require('pg-promise')();

// configuration object
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'Zimmer',
};

const db = pgp(cn);

module.exports = db;
