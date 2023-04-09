const admin = require("../config/firebase");
const { findOrCreateUserByEmail } = require("../controllers/userController");

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (decodedToken) {
      let userRes = await findOrCreateUserByEmail(decodedToken.name, decodedToken.email);

      if(!userRes.success) {
        return res.status(401).json({ success: false, message: "Unauthorized" , header : req.headers});
      }

      req.user = userRes.user;
      return next();
    }

    return res.status(401).json({ success: false, message: "Unauthorized" , header : req.headers});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Unauthorized" , header : req.headers});
  }
};

module.exports = isAuthorized;
