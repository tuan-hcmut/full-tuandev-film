const express = require("express");
const recentController = require("../controllers/recentController");

const router = express.Router();

router.post("/modify", recentController.modifyRecent);
router.post("/getlist", recentController.getList);

module.exports = router;
