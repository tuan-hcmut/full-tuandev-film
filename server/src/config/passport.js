// const Facebook = require("passport-facebook").Strategy;
// const Github = require("passport-github").Strategy;
// const Google = require("passport-google-oauth20").Strategy;
// const keys = require("./index");
// const db = require("./db");
// const bcrypt = require("bcrypt");

// // const addUser = async (profile) => {
// //   const user = { ...profile };

// //   if (user.provider === "google") {
// //     db.query(
// //       "SELECT * FROM users WHERE email=?;",
// //       user._json.email,
// //       async (err, users) => {
// //         if (err) console.log(err);
// //         const newPassword = await bcrypt.hash(user.id, 12);

// //         console.log(users[0]);
// //         if (users[0] === undefined) {
// //           db.query(
// //             "INSERT INTO users (email, password, firstname, lastname, photo) VALUE(?,?,?,?,?)",
// //             [
// //               user._json.email,
// //               newPassword,
// //               user.given_name,
// //               user.family_name,
// //               user.picture,
// //             ],
// //             (err, response) => {}
// //           );
// //         }
// //       }
// //     );
// //   }
// // };

// module.exports = (passport) => {
//   passport.serializeUser((user, cb) => {
//     cb(null, user);
//   });

//   passport.deserializeUser((user, cb) => {
//     cb(null, user);
//   });
//   passport.use(
//     new Facebook(
//       {
//         clientID: keys.FACEBOOK.clientID,
//         clientSecret: keys.FACEBOOK.clientSecret,
//         callbackURL: "/auth/facebook/cb",
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         console.log(profile);
//         cb(null, profile);
//       }
//     )
//   );

//   passport.use(
//     new Github(
//       {
//         clientID: keys.GITHUB.clientID,
//         clientSecret: keys.GITHUB.clientSecret,
//         callbackURL: "/auth/github/cb",
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         console.log(profile);
//         cb(null, profile);
//       }
//     )
//   );
//   passport.use(
//     new Google(
//       {
//         clientID: keys.GOOGLE.clientID,
//         clientSecret: keys.GOOGLE.clientSecret,
//         callbackURL: "/auth/google/callback",
//         scope: ["profile", "email"],
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         cb(null, profile);
//       }
//     )
//   );
// };
