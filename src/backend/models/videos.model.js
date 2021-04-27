const express = require('express');
const mongoose = require('mongoose');
const videosData = require('../databse/videos.data');
const { Schema } = mongoose;

const videoSchema = new Schema({
  videoId:String,
  title: String,
  views: Number,
  timestamp: String,
  length: String,
  like: Boolean,
  totalLikes: Number,
  channelName: String,
  uploadDate: Date,
})

const Video = mongoose.model('Video', videoSchema);

const addToVideos = async () => {
  try {
    for(const video of videosData ) {
      const {title,views,timestamp,length,like,totalLikes,channelName,uploadDate}=video;
      const videoInstance = await Video.create({
        title,
        views,
        timestamp,
        length,
        like,
        totalLikes,
        channelName,
        uploadDate,
      })
      console.log("saved prod")
    }
  }
  catch (error) {
    console.error("error while addinge", error);
  }
}

module.exports = {Video,addToVideos};