const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");

const router = express.Router();

router.post("/add", bookmarkController.modifyBookmark);
router.post("/isbookmark", bookmarkController.isBookmark);
router.post("/getlist", bookmarkController.getListBookmarks);
module.exports = router;
