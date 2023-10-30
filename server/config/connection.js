const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://devarasen:abcd1234@cluster0.edxqvxh.mongodb.net/ecorewards?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;
