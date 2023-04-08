const UserProgress = require("../models/userProgress");

exports.updateProgress = async (req, res) => {
  try {
    const { playlistId, userId, videoId } = req.body;

    const userProgress = await UserProgress.findOne({
      user_id: userId,
      playlist_id: playlistId
    });

    if (!userProgress) {
      return res.status(400).json({
        message: "Unable to find enrolled course"
      });
    }

    userProgress.video_id.push(videoId);

    await userProgress.save();

    return res.status(200).json({
      success: true,
      userProgress
    });
  } catch (err) {
    return res.json({
      message: err.message
    });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const { playlistId, userId } = req.body;

    const userProgress = await UserProgress.findOne({
        user_id: userId,
        playlist_id: playlistId
    });

    if (!userProgress) {
        return res.status(400).json({
            message: "Unable to find enrolled course"
        });
    }

    return res.status(200).json({
        success: true,
        userProgress
    });
  } catch(err) {
    return res.json({
        message : err.message
    })
  }
};
