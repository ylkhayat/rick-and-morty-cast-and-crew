const mongoose = require("mongoose");
const User = require("./models/user").User;

mongoose.connect("yourMongoDBConnectionURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = User;
