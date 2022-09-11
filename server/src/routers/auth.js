const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("testImg");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/isLogin", authController.isLogin);
router.get("/logout", authController.logout);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/cb",
  passport.authenticate("facebook", (req, res) => {})
);
router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/cb",
  passport.authenticate("github", (req, res) => {})
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_SIDE_FAIL_REDIRECT_URL,
  }),
  authController.addUserFromPassport,
  (req, res) => {
    res.redirect(process.env.CLIENT_SIDE_SUCCESS_REDIRECT_URL);
  }
);
module.exports = router;
