const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = require("./server");

//Connect to mongoDb then start express server and swagger
mongoose
  .connect("mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    
    app.listen(3000, () => {
      console.log("Server has started!");
    });
  });