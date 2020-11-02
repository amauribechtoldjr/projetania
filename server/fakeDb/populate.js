const mongoose = require("mongoose");
const config = require("../config");
const fakeDb = require("./FakeDb");

mongoose.connect(
  config.DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async () => {
    console.log("<------------Starting populating DB------------->");
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log("<------------DB has been populated------------->");
  }
);
