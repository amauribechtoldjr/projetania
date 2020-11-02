const slugify = require("slugify");
const uniqueSlug = require("unique-slug");

class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "page-admin"];
  }

  getAllByTopic(topic) {
    return this.Model.find({ topic: topic._id })
      .populate("topic")
      .populate("user")
      .populate("parent");
  }
}

module.exports = Post;
