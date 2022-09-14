const mysql = require("mysql");

let db;
if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "ltt-web",
  });
}
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
