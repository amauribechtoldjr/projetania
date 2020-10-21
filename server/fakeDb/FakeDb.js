const { projects, users } = require('./data');

const Project = require('../database/models/project');
const User = require('../database/models/user');

class FakeDb {
  async cleanData() {
    await Project.deleteMany({});
    await User.deleteMany({});
  }
  async addData() {
    await Project.create(projects);
    await User.create(users);
  }
  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDb();
