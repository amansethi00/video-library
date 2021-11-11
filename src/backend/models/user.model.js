const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: [true, "please choose unique username"] },
  password: String,
  likedVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  watchedVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  playlists: [{
    name: String,
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
  }]
})
const User = mongoose.model('User', userSchema);

module.exports = User;