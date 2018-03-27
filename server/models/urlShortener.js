const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
  shortenedUrl: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  originalUrl: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

  const Url = mongoose.model("Url", UrlSchema)

  module.exports = { Url }
