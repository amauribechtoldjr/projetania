const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { buildAuthContext } = require("./context");
const {
  projectsQueries,
  projectsMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} = require("./resolvers");
const { projectsTypes, userTypes, forumTypes } = require("./types");

// Graphql Models
const Project = require("./models/Project");
const User = require("./models/User");
const ForumCategory = require("./models/ForumCategory");
const Topic = require("./models/Topic");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${projectsTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
      project(id: ID): Project
      projects: [Project]
      userProjects: [Project]

      user: User

      forumCategories: [ForumCategory]
      topicsByCategory(category: ID): [Topic]
      topicBySlug(slug: String): Topic
    }

    type Mutation {
      createProject(input: ProjectInput): Project
      updateProject(id: ID, input: ProjectInput): Project
      deleteProject(id: ID): Project

      createTopic(input: TopicInput): Topic

      signIn(input: SignInInput): User
      signUp(input: SignUpInput): String
      signOut: Boolean
    }
  `;

  const resolvers = {
    Query: {
      ...projectsQueries,
      ...userQueries,
      ...forumQueries,
    },
    Mutation: {
      ...projectsMutations,
      ...userMutations,
      ...forumMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Project: new Project(mongoose.model("Project"), req.user),
        User: new User(mongoose.model("User")),
        ForumCategory: new ForumCategory(mongoose.model("ForumCategory")),
        Topic: new Topic(mongoose.model("Topic"), req.user),
      },
    }),
  });

  return apolloServer;
};
