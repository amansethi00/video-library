const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Video = require('../models/videos.model');

// router.use(async(req,res,next)=>{
//         const usernameAndPassword = req.headers.authorization;
//       const [username, password] = usernameAndPassword.split(":");
//       console.log({ username })
//       console.log({ password })
//       const userInstance = await User.findOne({ username, password });
//       req.user = userInstance;
//   next();
// })

router.route('/')
  .get(async (req, res) => {
    try {
      const userInstance = req.user;

      if (userInstance) {
      //         console.log(userInstance);
      // const populatedPlaylist = await userInstance.populate({
      //   path:'playlists.videos likedVideos',
      // }).execPopulate();
        res.json({ success: true, message: "user exists", user: userInstance })
      }
      else {
        res.json({ success: false, message: "user not found in database" })
      }
    }
    catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: err })
    }

  })
  .post(async (req, res) => {
    try {
      console.log(req.user);
      if (req.user) {

        return res.json({ success: false, message: "user already exist" })
      }
      const { username, password } = req.body;
      const userInstance = await User.findOne({ username, password });
      if (userInstance) {
        return res.json({ success: false, message: "user already exist" })
      }
      const userCreateInstance = await User.create({ username, password })
      res.status(201).json({ success: true, user: userCreateInstance });

    }
    catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  })
router.route('/:userId')
  .get(async (req, res) => {
    try {
      console.log("request params",req.params)
      const { userId } = req.params;
      console.log(userId);
      const user = await User.findOne({ _id: userId })
      console.log(user);
      res.json({ success: true, message: "app in development" })
    }
    catch(error){
      console.log(error);
      res.status(404).json({success:false,message:"error in catch "}) 
    }

  })
  .post(async(req,res)=>{

  })
module.exports = router;