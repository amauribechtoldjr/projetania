const slugify = require("slugify");
const uniqueSlug = require("unique-slug");
const BaseModel = require("./BaseModel");
const { formatISO } = require("date-fns");

class Post extends BaseModel {
  async create(postData) {
    if (!this.user) throw new Error("You are not authenticated");

    postData.user = this.user;

    const createdAt = formatISO(new Date());
    const slugPart = uniqueSlug();
    const fullSlugPart = createdAt + ":" + slugPart;

    if (postData.parent) {
      const parent = await this.Model.findById(postData.parent);
      postData.slug = parent.slug + ":" + slugPart;
      postData.fullSlug = parent.fullSlug + ":" + fullSlugPart;
    }

    if (!postData.parent) {
      postData.slug = slugPart;
      postData.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(postData);
    return this.Model.findById(createdPost._id)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });
  }
  async getAllByTopic({ topic, pageNum = 1, pageSize = 5 }) {
    const skips = pageSize * (pageNum - 1);
    const count = await this.Model.countDocuments({ topic: topic._id });
    const posts = await this.Model.find({ topic: topic._id })
      .sort("createdAt")
      .skip(skips)
      .limit(pageSize)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });

    return {
      posts,
      count,
    };
  }
}

module.exports = Post;
