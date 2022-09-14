const db = require("../config/db");
const response = require("../config/response");

exports.modifyBookmark = async (req, res) => {
  const { user_id, name, poster_path, vote_average, film_id, type } = req.body;

  db.query(
    "SELECT * FROM bookmark WHERE user_id=? AND film_id=?;",
    [user_id, film_id],
    (err, bookmarks) => {
      if (err) console.log(err);
      if (bookmarks === undefined || bookmarks.length > 0) {
        db.query(
          "DELETE FROM bookmark WHERE user_id=? AND film_id=?;",
          [user_id, film_id],
          (err, resutls) => {
            if (err) console.log(err);
            response(res, null, null, "Delete success!!", 200);
          }
        );
      } else {
        db.query(
          "INSERT INTO bookmark(name, user_id, poster_path, vote_average, film_id, type) VALUE(?,?,?,?,?,?);",
          [name, user_id, poster_path, vote_average, film_id, type],
          (err, resutls) => {
            if (err) console.log(err);
            response(res, null, null, "Add success!!", 200);
          }
        );
      }
    }
  );
};

exports.getListBookmarks = async (req, res) => {
  const { user_id, type } = req.body;

  db.query(
    "SELECT * FROM bookmark WHERE user_id=? AND type=? ORDER BY bookmark.createdAt DESC;",
    [user_id, type],
    (err, bookmarks) => {
      if (err) console.log(err);
      response(res, bookmarks, null, "", 200);
    }
  );
};

exports.isBookmark = async (req, res) => {
  const { user_id, film_id } = req.body;

  db.query(
    "SELECT * FROM bookmark WHERE user_id=? AND film_id=?;",
    [user_id, film_id],
    (err, bookmarks) => {
      if (err) console.log(err);
      if (bookmarks && bookmarks.length > 0) {
        response(res, bookmarks[0], "", 200);
      } else {
        response(res, null, "", 200);
      }
    }
  );
};
