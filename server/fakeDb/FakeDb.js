const { projects, users, forumCategories, topics } = require("./data");

const Project = require("../database/models/project");
const User = require("../database/models/user");
const ForumCategory = require("../database/models/forumCategory");
const Topic = require("../database/models/topic");

class FakeDb {
  async cleanData() {
    await Project.deleteMany({});
    await User.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
  }
  async addData() {
    await Project.create(projects);
    await User.create(users);
    await ForumCategory.create(forumCategories);
    await Topic.create(topics);
  }
  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDb();
