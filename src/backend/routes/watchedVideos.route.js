const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const User = require('../models/user.model');

router.route('/')
  .get(async (req, res) => {
    try {
      const userInstance = req.user;
      console.log({userInstance});
      const populatedUser = await userInstance.populate({
        path:'watchedVideos'
      }).execPopulate();
      console.log({populatedUser});
      res.json({
        success: true,
        watchedVideos: populatedUser.watchedVideos
      })
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }

  })
router.route('/:videoId')
  .post(async (req, res) => {
    try {
      const userInstance = req.user;
      const newVideoId = req.params.videoId;
      if (req.user.watchedVideos.indexOf(newVideoId) !== -1) {
        return res.json({ "success": false, message: "video already in the watched videos" })
      }
      const addedVideoId = extend(
        req.user, {
          watchedVideos: [newVideoId, ...req.user.watchedVideos]
        }
      )
      const dbResponse = await addedVideoId.save();
      res.json({ "success": true, dbResponse });
    }
    catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "sent front catch block" })
    }

  })

module.exports = router;