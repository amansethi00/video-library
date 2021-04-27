const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const User = require('../models/user.model');
// const { populate, exec } = require('mongoose');

router.route('/')
  .get(async (req, res) => {
    console.log(req.user);
    try {
      const userInstance = req.user;
      console.log(userInstance);
      const populatedPlaylist = await userInstance.populate({
        path: 'playlists.videos ',
      }).execPopulate();
      res.json({
        success: true,
        playlists: populatedPlaylist.playlists
      })
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })
  .post(async (req, res) => {
    try {
      const { name } = req.body;
      console.log("name of playlist", name);
      const populatedUser = await req.user.populate('playlists.videos').execPopulate();
      const isPlaylistNameExist = populatedUser.playlists.find(prev=>prev.name===name);
      console.log(isPlaylistNameExist);
      if (isPlaylistNameExist) {
        res.json({ success: false, messgae: "playlist already exist" });
      }
      else {
        const updateUser = await req.user.update({
          $push: {
            playlists: { name },
          }
        })
        const getUser = await User.findOne({_id:req.user._id}).populate('playlists.videos');
        res.status(201).json({ success: true, message: "successfully created playlist",user:getUser });
      }

    }
    catch (error) {
      console.log(error);
      res.status(404).json({ success: false, message: error })

    }
  })

// router.param('/videoId',async(req,res,next,id)=>{

//   next();
// })
router.route('/:videoId')
  .post(async (req, res) => {
    try {
      console.log("req user", req.user);
      const { name } = req.body;
      const newVideoId = req.params.videoId;
      console.log({ newVideoId });
      const toBeUpdatedPlaylist = req.user.playlists.find(item => item.name === name);
      if (toBeUpdatedPlaylist.videos.indexOf(newVideoId) !== -1) {
        return res.json({ success: false, message: "video already in the playlist" });
      }
      console.log({ toBeUpdatedPlaylist });
      const updateWithExtend = extend(toBeUpdatedPlaylist, {
        videos: [...toBeUpdatedPlaylist.videos, newVideoId]
      })
      const allPlaylist = extend(req.user.playlists, {
        _id: updateWithExtend._id,
        name: updateWithExtend.name, videos: updateWithExtend.videos
      })
      console.log({ updateWithExtend });
      const addedVideoId = extend(
        req.user, {
          playlists: allPlaylist,
        }
      )
      console.log("Added video Id", addedVideoId);
      const dbResponse = await addedVideoId.save();
      res.status(201).json({ "success": true, dbResponse,message:`succesfully added to the ${name} playlist` });
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })
// .post(async (req, res) => {
//   try {
//     console.log(req.user);
//     const { name } = req.body;
//     const { videoId } = req.params;
//     console.log(videoId);

//     const user = req.user;
//     user.playlists = user.playlists.map(playlist =>
//       playlist.name === name
//         ? {
//           ...playlist,
//           videos:
//             [...playlist.videos, videoId]
//         }
//         : playlist
//     )
//     console.log("user playlist", user.playlists);
//     console.log("user before saving",user)
//     await user.save();
//     res.status(201).json({ success: true, message: "successfully add to plasylist", user: updatedUser, gettingUser });
//   }
//   catch (error) {
//     console.log(error);
//     res.status(404).json({ success: false, message: "sent front catch block" })
//   }
// })
module.exports = router;