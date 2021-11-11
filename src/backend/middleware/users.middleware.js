const express = require('express');
const User = require('../models/user.model');

const middleware = async (req, res, next) => {
  console.log("req head autjoroxzation",req.headers);
  console.log({req});
  const usernameAndPassword = req.headers.authorization;
  const [username, password] = usernameAndPassword.split(":");
  console.log({ username })
  console.log({ password })
  const userInstance = await User.findOne({ username, password });
  console.log(userInstance);
  req.user = userInstance;
  console.log("I am in th middleware ")
  next();
};

module.exports = middleware;