class ForumCategory {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "page-admin"];
  }
  getAll() {
    return this.Model.find({});
  }
  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate("user");
  }
}

module.exports = ForumCategory;
