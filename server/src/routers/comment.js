const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/add", commentController.addComment);
router.post("/getlist", commentController.getListComments);
module.exports = router;
