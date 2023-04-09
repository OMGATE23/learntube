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

exports.findOrcreateUserIfNotFound = async (req, res) => {
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

    let user = await User.findOne({email})

    if(!user){
      user = await User.create({
        name , email
      })
    }
    
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
    const user = req.user;

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

exports.findOrCreateUserByEmail = async (name , email) => {
  try {
    
    let user = await User.findOne({email})


    if(!user){
      user = await User.create({
        name , email
      })
    }
    return  {success: true, user} 
  } catch(err) {
    console.log(err)
    return {success: false, message: err.message}
  }
}

exports.addPoint = async (req,res) => {
  try {
    const {_id, points} = req.user;

    const newPoints = points + 1;

    const user = await User.findById(_id);

    user.points = newPoints

    await user.save()
    
  } catch(err) {
    console.log(err.message)
    return res.json({
      error  :err.message
    })
  }
}

exports.leaderBoard = async (req , res) => {
  try {
    let users = await User.find()
    users = users.sort((a, b) => b.points - a.points);
    users = users.slice(0 , 10)
    return res.status(200).json({
      length : users.length,
      users

    })


  } catch(err) {
    return res.json({
      error : err.message
    })
  }
}