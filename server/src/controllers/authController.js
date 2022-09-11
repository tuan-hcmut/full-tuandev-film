const db = require("../config/db");
const bcrypt = require("bcryptjs");
const response = require("../config/response");

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const newPassword = await bcrypt.hash(password, 12);

  db.query("SELECT * FROM users WHERE email=?;", email, (err, users) => {
    if (err) console.log(err);

    if (users.length > 0) {
      return response(res, null, "Email already register!!!", 400);
    } else {
      db.query(
        "INSERT INTO users (email, password, firstname, lastname) VALUE(?,?,?,?)",
        [email, newPassword, firstName, lastName],
        (err, result) => {
          if (err) console.log(err);
          req.session.user = {
            email,
            firstname: firstName,
            lastname: lastName,
            photo: "/meo-cute.jpg",
            id: result.insertId,
          };

          return response(res, null, "Sign up success!!!", 200);
        }
      );
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email=?;", email, (err, users) => {
    if (err) console.log(err);

    if (users.length > 0) {
      bcrypt.compare(password, users[0].password, (error, result) => {
        if (result) {
          users[0].password = undefined;
          req.session.user = users[0];

          return response(res, null, "Login successfull!!", 200);
        } else {
          return response(res, null, "Invalid email or password!!!", 400);
        }
      });
    } else {
      return response(res, null, "Invalid email or password!!!", 400);
    }
  });
};

exports.isLogin = async (req, res) => {
  if (req.session.passport && req.session.user) {
    db.query(
      "SELECT * FROM users WHERE email=?;",
      req.session.passport.user.emails[0].value,
      (err, users) => {
        req.session.user.id = users[0].id;
        response(res, { user: req.session.user, isLoged: true }, "", 200);
      }
    );
  } else {
    req.session.user
      ? response(res, { user: req.session.user, isLoged: true }, "", 200)
      : response(res, { user: null, isLoged: false }, "", 200);
  }
};

exports.logout = async (req, res) => {
  req.session.user = null;
  response(res, { user: null, isLoged: false }, "Success!!!", 200);
};

exports.addUserFromPassport = async (req, res, next) => {
  const newPassword = await bcrypt.hash(req.user.id, 12);

  req.session.user = {
    email: req.user.emails[0].value,
    firstname: req.user.name.familyName,
    lastname: req.user.name.givenName,
    photo: req.user.photos[0].value,
  };

  db.query(
    "SELECT * FROM users WHERE email=?;",
    req.user.emails[0].value,
    (err, users) => {
      if (err) console.log(err);

      if (users.length === 0) {
        db.query(
          "INSERT INTO users (email, password, firstname, lastname, photo) VALUE(?,?,?,?,?)",
          [
            req.user.emails[0].value,
            newPassword,
            req.user.name.familyName,
            req.user.name.givenName,
            req.user.photos[0].value,
          ],
          (err, result) => {
            if (err) console.log(err);
          }
        );
      }
    }
  );

  next();
};
