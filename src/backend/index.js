const express = require('express');
const db = require('./db.connect');
const cors = require('cors')
const bodyParser = require('body-parser')
const videos = require('./routes/videos.route');
const user = require('./routes/users.route.js');
const playlists = require('./routes/playlists.route');
const likedVideos = require('./routes/likedVideos.route');
const watchedVideos = require('./routes/watchedVideos.route');
const userMiddleware = require('./middleware/users.middleware');
const authMiddleware = require('./middleware/auth.middleware');
// const { addToVideos } = require("./models/videos.model");
const User = require("./models/user.model");
const { addToVideos,Video } = require('./models/videos.model');
// const videos = require('./databse/videos.data');
const app = express();
db();

app.use(cors())
app.use(bodyParser.json());
app.use('/videos', videos);
app.use('/user', userMiddleware, user);
app.use('/playlists', authMiddleware, playlists);
app.use('/likedVideos', authMiddleware, likedVideos);
app.use('/watchedVideos', authMiddleware,watchedVideos);
// app.use('/playlists/videoId',authMiddleware,playlists);
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
// error handler 
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ success: false, message: err.message })
})
// 404 handler DO NOT MOVE
app.use(function(req, res, next) {
  res.status(404).json("Sorry can't find that!")
})
app.listen(3000, () => {
  console.log('server started');
});

//adding to videos
// for (const video of videos) {
//   const {  
//       videoId,
//       title,
//       views,
//       timestamp,
//       length,
//       like,
//       totalLikes,
//       channelName,
//       playlist,
//       uploadDate
//   } = video;
//   try{
//      const newVid =new Video({
//       videoId,
//       title,
//       views,
//       timestamp,
//       length,
//       like,
//       totalLikes,
//       channelName,
//       playlist,
//       uploadDate
//   });
//   newVid.save();
//   }
//   catch(error){
//     console.log(error);
//   }
 
// }