const projectFields = `
  title: String!
  about_project: String
  createdAt: String
`;

exports.projectsTypes = `
  type Project {
    _id: ID
    ${projectFields}
  }

  input ProjectInput {
    ${projectFields}
  }
`;

exports.userTypes = `
  type User {
    _id: ID
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

exports.forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subtitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }
`;
