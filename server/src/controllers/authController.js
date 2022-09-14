const db = require("../config/db");
const bcrypt = require("bcryptjs");
const response = require("../config/response");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET || "hgsidu3359211@3412rtgg!$fsfsfgdj15dg5fs5s581adf",
    {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    }
  );
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user.email);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  return response(res, user, token, message, statusCode);
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const newPassword = await bcrypt.hash(password, 12);

  db.query("SELECT * FROM users WHERE email=?;", email, (err, users) => {
    if (err) console.log(err);

    if (users.length > 0) {
      return response(res, null, null, "Email already register!!!", 400);
    } else {
      db.query(
        "INSERT INTO users (email, password, firstname, lastname) VALUE(?,?,?,?)",
        [email, newPassword, firstName, lastName],
        (err, result) => {
          if (err) console.log(err);

          return createSendToken(
            {
              email,
              firstname: firstName,
              lastname: lastName,
              photo: "/meo-cute.jpg",
              id: result.insertId,
            },
            200,
            res,
            "Sign up success!!!"
          );
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

          return createSendToken(users[0], 200, res, "Login success!!!");
        } else {
          return response(res, null, null, "Invalid email or password!!!", 400);
        }
      });
    } else {
      return response(res, null, null, "Invalid email or password!!!", 400);
    }
  });
};

exports.isLogin = async (req, res) => {
  //// no need to catch err just check user is logged or notc
  if (req.body.token) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.body.token,
        process.env.JWT_SECRET ||
          "hgsidu3359211@3412rtgg!$fsfsfgdj15dg5fs5s581adf"
      );
      db.query(
        "SELECT * FROM users WHERE email=?;",
        decoded.email,
        (err, users) => {
          users[0]
            ? response(res, { user: users[0], isLoged: true }, null, "", 200)
            : response(res, { user: null, isLoged: false }, null, "", 200);
        }
      );
    } catch (e) {
      response(res, { user: null, isLoged: false }, null, "", 200);
    }
  } else {
    response(res, { user: null, isLoged: false }, null, "", 200);
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  response(res, { user: null, isLoged: false }, null, "Success!!!", 200);
};

exports.addUserFromGoogle = async (req, res, next) => {
  const newPassword = await bcrypt.hash(req.body.uid, 12);

  db.query(
    "SELECT * FROM users WHERE email=?;",
    req.body.email,
    (err, users) => {
      if (err) console.log(err);

      if (users.length === 0) {
        db.query(
          "INSERT INTO users (email, password, firstname, lastname, photo) VALUE(?,?,?,?,?)",
          [
            req.body.email,
            newPassword,
            "",
            req.body.displayName,
            req.body.photoURL,
          ],
          (err, result) => {
            if (err) console.log(err);
          }
        );
      }
      return createSendToken(req.body, 200, res, "Login success!!!");
    }
  );
};
