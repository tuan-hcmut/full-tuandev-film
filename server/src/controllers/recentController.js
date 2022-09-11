const db = require("../config/db");
const response = require("../config/response");

exports.modifyRecent = async (req, res) => {
  db.query(
    "SELECT * FROM recent WHERE user_id=? AND film_id=?",
    [req.body.user_id, req.body.film_id],
    (err, recents) => {
      if (err) console.log(err);

      if (recents && recents.length > 0) {
        db.query(
          "UPDATE recent SET createdAt=? WHERE user_id=? AND film_id=?;",
          [new Date(), req.body.user_id, req.body.film_id],
          (err, results) => {
            if (err) console.log(err);
            response(res, null, "", 200);
          }
        );
      } else {
        db.query(
          "INSERT INTO recent(user_id, name, poster_path, vote_average, film_id, type, overview, runtime) VALUE(?,?,?,?,?,?,?,?)",
          [
            req.body.user_id,
            req.body.name,
            req.body.poster_path,
            req.body.vote_average,
            req.body.film_id,
            req.body.type,
            req.body.overview,
            req.body.runtime,
          ],
          (err, results) => {
            if (err) console.log(err);
            response(res, null, "", 200);
          }
        );
      }
    }
  );
};

exports.getList = async (req, res) => {
  db.query(
    "SELECT * FROM recent WHERE user_id=? ORDER BY recent.createdAt DESC;",
    req.body.user_id,
    (err, recents) => {
      if (err) console.log(err);
      response(res, recents, "", 200);
    }
  );
};
