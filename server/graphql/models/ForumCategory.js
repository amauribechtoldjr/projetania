class ForumCategory {
  constructor(model) {
    this.Model = model;
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
