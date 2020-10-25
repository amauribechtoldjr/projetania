class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "page-admin"];
  }
  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate("user")
      .populate("forumCategory");
  }
}

module.exports = Topic;
