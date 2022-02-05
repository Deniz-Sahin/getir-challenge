const mongoose = require("mongoose");

const schema = mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: [Number]
});

module.exports = mongoose.model("Record", schema);