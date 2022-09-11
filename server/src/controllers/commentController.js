const db = require("../config/db");
const response = require("../config/response");

exports.addComment = async (req, res) => {
  const { commentText, userId, filmId } = req.body;
  db.query(
    "INSERT INTO comments (comment_text, user_id, film_id) VALUE (?,?,?);",
    [commentText, userId, filmId],
    (err, result) => {
      if (err) console.log(err);
      response(res, null, "Add success", 200);
    }
  );
};

exports.getListComments = async (req, res) => {
  const filmId = req.body.id;

  db.query(
    "SELECT * FROM comments JOIN users ON comments.user_id = users.id WHERE film_id=? ORDER BY comments.createdAt DESC;",
    filmId,
    (err, results) => {
      response(res, results, "Get success", 200);
    }
  );
};
