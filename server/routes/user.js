const express = require("express");
const {
  createUser,
  getUser,
  updateCategory,
  enrollPlaylist,
  findOrcreateUserIfNotFound,
  addPoint,
  leaderBoard,
} = require("../controllers/userController");
const {
  updateProgress,
  getProgress,
  getUserAllProgress,
} = require("../controllers/userProgressController");
const isAuthorized = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/signin").post(findOrcreateUserIfNotFound);
router.route("/getuser").get(isAuthorized, getUser);
router.route("/category").put(updateCategory);
router.route("/enroll").put(enrollPlaylist);
router.route("/updateprogress").put(updateProgress);
router.route("/dashboard").get( isAuthorized , getUserAllProgress)
router.route("/getprogress/:playlistId").get( isAuthorized, getProgress);
router.route("/addpoint").put(isAuthorized , addPoint )
router.route("/leaderboard").get(leaderBoard)

module.exports = router;
