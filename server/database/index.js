const mongoose = require("mongoose");
const config = require("../config/dev");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("./models/project");
require("./models/user");
require("./models/forumCategory");
require("./models/topic");

exports.connect = () => {
  mongoose.connect(
    config.DB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log("connected");
    }
  );
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: "projetaniaSessions",
  });

  return store;
};
