const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const User = require('../models/user.model');
const mongoose = require('mongoose');
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
      let inLikedVideos =false;
      for(let likedVideo of req.user.likedVideos){
        if(likedVideo == newVideoId){
          inLikedVideos=true;
        }
      }
      console.log({inLikedVideos});
      if (inLikedVideos === false) {
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
      res.status(201).json({ "success": true, dbResponse, message: "added to liked videos" });
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }
  })
  .delete(async (req, res) => {
    const newVideoId = req.params.videoId;

    try {
      if (req.user.likedVideos.indexOf(newVideoId) !== -1) {
        await req.user.likedVideos.pull(newVideoId);
        await req.user.save();
        const newRequser = await User.findOne({ _id: req.user._id });
        return res.json({ "success": true, message: "video removed from liked videos", newRequser })
      }

      return res.json({ "success": false, dbResponse, message: "video not found in liked videos" });
    }
    catch (error) {
      console.log(error);
      res.status(400).json({
        success: false, errorMessage: "something went wrong"
      });
    }
  })
module.exports = router;