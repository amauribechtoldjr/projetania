const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { buildAuthContext } = require("./context");
const {
  projectsQueries,
  projectsMutations,
  userMutations,
  userQueries,
} = require("./resolvers");
const { projectsTypes, userTypes } = require("./types");

// Graphql Models
const Project = require("./models/Project");
const User = require("./models/User");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${projectsTypes}
    ${userTypes}

    type Query {
      project(id: ID): Project
      projects: [Project]
      userProjects: [Project]

      user: User
    }

    type Mutation {
      createProject(input: ProjectInput): Project
      updateProject(id: ID, input: ProjectInput): Project
      deleteProject(id: ID): Project

      signIn(input: SignInInput): User
      signUp(input: SignUpInput): String
      signOut: Boolean
    }
  `;

  const resolvers = {
    Query: {
      ...projectsQueries,
      ...userQueries,
    },
    Mutation: {
      ...projectsMutations,
      ...userMutations,
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
      },
    }),
  });

  return apolloServer;
};
