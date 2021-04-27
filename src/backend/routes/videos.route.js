const express = require('express');
const router = express.Router();
const { Video } = require('../models/videos.model')
router.route('/')
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json({ videos, success: true });
    }
    catch (error) {
      console.error(error);
      res.status(502).json({ success: false, message: error })
    }

  })

router.route('/:videoId')
  .get(async (req, res) => {
    try {
      const {videoId}=req.params;
      const video = await Video.findOne({_id:videoId})
      res.json({video,success:true});
    }
    catch (error) {
      console.error(error);
      res.status(502).json({ success: false, message: error })
    }
  })

module.exports = router;
