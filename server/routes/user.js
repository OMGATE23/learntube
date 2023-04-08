const express = require("express");
const {
  createUser,
  getUser,
  updateCategory,
  enrollPlaylist,
  findOrcreateUserIfNotFound,
} = require("../controllers/userController");
const {
  updateProgress,
  getProgress,
} = require("../controllers/userProgressController");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/signin").post(findOrcreateUserIfNotFound);
router.route("/getuser").get(getUser);
router.route("/category").put(updateCategory);
router.route("/enroll").put(enrollPlaylist);
router.route("/updateprogress").put(updateProgress);
router.route("/getprogress").get(getProgress);

module.exports = router;
