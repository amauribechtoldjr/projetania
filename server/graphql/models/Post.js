const slugify = require("slugify");
const uniqueSlug = require("unique-slug");
const { formatISO } = require("date-fns");

class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "page-admin"];
  }
  async create(postData) {
    if (!this.user) throw new Error("You are not authenticated");

    postData.user = this.user;

    const createdAt = formatISO(new Date());
    const slugPart = uniqueSlug();
    const fullSlugPart = createdAt + ":" + slugPart;

    if (postData.parent) {
      const parent = await this.Model.findById(postData.parent);
      console.log(parent);
      postData.slug = parent.slug + ":" + slugPart;
      postData.fullSlug = parent.fullSlug + ":" + fullSlugPart;
    }

    if (!postData.parent) {
      postData.slug = slugPart;
      postData.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(postData);
    console.log(createdPost);
    return this.Model.findById(createdPost._id)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });
  }
  getAllByTopic(topic) {
    return this.Model.find({ topic: topic._id })
      .sort("fullSlug")
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });
  }
}

module.exports = Post;
