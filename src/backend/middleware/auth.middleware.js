const express = require('express');
const User = require('../models/user.model');

const middleware = async (req, res, next) => {
  const usernameAndPassword = req.headers.authorization;
  if (usernameAndPassword) {
    const [username, password] = usernameAndPassword.split(":");
    console.log({ username })
    console.log({ password })
    const userInstance = await User.findOne({ username, password });
    console.log(userInstance);
    req.user = userInstance;
    console.log("I am in th middleware ")
    if (!userInstance) {
      return res.json({ success: false, message: "user does not exist" });
    }
    next();
  }
  else {
    return res.status(401).json({ success: false, message: "please login or signup to add to liked videos" })
  }


};

module.exports = middleware;