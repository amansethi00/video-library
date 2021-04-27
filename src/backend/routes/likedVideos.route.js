const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const User = require('../models/user.model');

router.route('/')
  .get(async (req, res) => {
    try {
      const userInstance = req.user;
      console.log({ userInstance });
      const populatedUser = await userInstance.populate({
        path: 'likedVideos'
      }).execPopulate();
      console.log({ populatedUser });
      res.json({
        success: true,
        likedVideos: populatedUser.likedVideos
      })
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })
router.route('/:videoId')
  .get(async (req, res) => {
    try {
      const newVideoId = req.params.videoId;
      const inLikedVideos = req.user.likedVideos.indexOf(newVideoId);
      if (inLikedVideos === -1) {
        return res.json({
          success: true,
          inLikedVideos: false
        })
      }
      res.json({ success: true, inLikedVideos: true });
    }
    catch (error) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })
  .post(async (req, res) => {
    try {
      console.log("req user", req.user);
      const newVideoId = req.params.videoId;
      if (req.user.likedVideos.indexOf(newVideoId) !== -1) {
        return res.json({ "success": false, message: "video already in the liked videos" })
      }
      const addedVideoId = extend(
        req.user, {
          likedVideos: [newVideoId, ...req.user.likedVideos]
        }
      )
      const dbResponse = await addedVideoId.save();
      res.status(201).json({ "success": true, dbResponse,message:"added to liked videos" });
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })

module.exports = router;