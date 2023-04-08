const User = require("../models/user");
const UserProgress = require("../models/userProgress");

exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        requestBody: req.body,
        message: "Email not provided",
      });
    }

    if (!name) {
      return res.status(400).json({
        requestBody: req.body,
        message: "Name not provided",
      });
    }

    const user = await User.create({
      email,
      name,
    });

    console.log(user);

    return res.status(200).json({
        success : true,
        user
    })
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};


exports.getUser = async (req, res) => {
  try {
    const { id } = req.body

    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: err.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { userId,  category } = req.body;
    
    if (!category) {
      return res.status(400).json({
        message: "Category Missing",
      });
    }

    const user = await User.findById(userId);

    user.category = category

    await user.save()


    return res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

exports.enrollPlaylist = async(req,res) => {
    try {
        const { userId , playlistId } = req.body;
        
        if (!playlistId) {
          return res.status(400).json({
            message: "Playlist Id Missing",
          });
        }
    
        const user = await User.findById(userId);
    
        user.enrolled_playlists.push(playlistId)

        const userProgress = await UserProgress.create({
            user_id : user._id,
            playlist_id : playlistId
        })
    
        await user.save()
        return res.status(200).json({
          success: true,
          user,
          userProgress

        });
      } catch (err) {
        return res.json({
          message: err.message,
        });
      }
}