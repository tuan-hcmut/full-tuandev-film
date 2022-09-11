const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.patch(
  "/settinginfor",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.settingInfor
);

router.patch("/settingpassword", userController.settingPassword);

module.exports = router;
