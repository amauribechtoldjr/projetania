exports.mixedQueries = {
  highlight: async (root, { limit = 3 }, ctx) => {
    const projects = await ctx.models.Project.getRandoms(limit);
    const topics = await ctx.models.Topic.getRandoms(limit);

    return {
      projects,
      topics,
    };
  },
};

exports.projectsQueries = {
  project: (root, { id }, ctx) => {
    return ctx.models.Project.getById(id);
  },
  projects: (root, args, ctx) => {
    return ctx.models.Project.getAll();
  },
  userProjects: (root, args, ctx) => {
    return ctx.models.Project.getAllByUser();
  },
};

exports.projectsMutations = {
  createProject: async (root, { input }, ctx) => {
    const createdProject = await ctx.models.Project.create(input);
    return createdProject;
  },
  updateProject: async (root, { id, input }, ctx) => {
    const updatedProject = await ctx.models.Project.findAndUpdate(id, input);
    return updatedProject;
  },
  deleteProject: async (root, { id }, ctx) => {
    const deletedProject = await ctx.models.Project.findAndRemove(id);
    return deletedProject._id;
  },
};

exports.userMutations = {
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.forumQueries = {
  forumCategories: (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);

    if (!forumCategory) return null;

    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
  topicBySlug: (root, { slug }, ctx) => {
    return ctx.models.Topic.getBySlug(slug);
  },
  postsByTopic: async (root, { slug, ...pagination }, ctx) => {
    const topic = await ctx.models.Topic.getBySlug(slug);
    return ctx.models.Post.getAllByTopic({ topic, ...pagination });
  },
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(
      input.forumCategory
    );
    input.forumCategory = category._id;

    const topic = await ctx.models.Topic.create(input);
    return topic;
  },
  createPost: async (root, { input }, ctx) => {
    const post = await ctx.models.Post.create(input);
    return post;
  },
};
