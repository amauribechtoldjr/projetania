class Project {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "page-admin"];
  }
  getAll() {
    return this.Model.find({});
  }
  getAllByUser() {
    return this.Model.find({ user: this.user._id }).sort({ createdAt: "desc" });
  }
  getById(id) {
    return this.Model.findById(id);
  }
  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role))
      throw new Error("Not authorised");

    data.user = this.user;

    return this.Model.create(data);
  }
  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
  findAndRemove(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Project;
