class Project {
  constructor(model) {
    this.Model = model;
  }
  getAll() {
    return this.Model.find({});
  }
  getById(id) {
    return this.Model.findById(id);
  }
  create(data) {
    return this.Model.create(data);
  }
  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({_id: id}, data, {new: true});
  }
  findAndRemove(id) {
    return this.Model.findOneAndRemove({_id: id});
  }
}

module.exports = Project;
