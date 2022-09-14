const db = require("../config/db");
const sharp = require("sharp");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const bcrypt = require("bcryptjs");
const response = require("../config/response");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new error("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.body.lastname}-${Date.now().toString()}.jpeg`; /// photo user upload

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`); //save photo user upload following the url

  next();
};

exports.uploadUserPhoto = upload.single("photo");

exports.settingInfor = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  let photo;
  req.file === undefined
    ? (photo = req.body.photo[0])
    : (photo = req.file.filename);

  db.query(
    "UPDATE users SET firstname =?, lastname =?, photo=? WHERE email=?",
    [firstname, lastname, photo, email],
    (err, user) => {
      if (err) console.log(err);

      return response(
        res,
        { firstname, lastname, photo },
        null,
        "Update success!!!",
        200
      );
    }
  );
};

exports.settingPassword = async (req, res) => {
  const { currentpassword, newpassword, email } = req.body;

  db.query("SELECT * FROM users WHERE email=?", email, async (err, users) => {
    const result = await bcrypt.compare(currentpassword, users[0].password);

    if (result) {
      const newPassword = await bcrypt.hash(newpassword, 12);

      db.query(
        "UPDATE users SET password=? WHERE email=?",
        [newPassword, email],
        (err, response) => {
          if (err) console.log(err);

          res.status(200).json({
            data: null,
            message: "Update success!!!",
          });
        }
      );
    } else {
      return response(
        res,
        null,
        null,
        "Password you provided not correct!!!",
        400
      );
    }
  });
};
