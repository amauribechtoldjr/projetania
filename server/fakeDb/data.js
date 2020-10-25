const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();

const topic1Id = mongoose.Types.ObjectId();
const topic2Id = mongoose.Types.ObjectId();

const data = {
  projects: [
    {
      title: "Projeto 01",
      about_project: "Sobre o projeto 01",
      user: user1Id,
    },
    {
      title: "Projeto 02",
      about_project: "Sobre o projeto 02",
      user: user2Id,
    },
  ],
  users: [
    {
      _id: user1Id,
      name: "Amauri Bechtold Junior",
      username: "amauribechtoldjr",
      password: "senha123",
      email: "amauribechtoldjr@gmail.com",
      info: "page-admin",
      role: "page-admin",
    },
    {
      _id: user2Id,
      name: "Administrador",
      username: "admin",
      password: "admin123",
      email: "admin@projetania.com",
      info: "Administrador",
      role: "admin",
    },
  ],
  forumCategories: [
    {
      _id: forum1Id,
      title: "General Discussion",
      subtitle: "Open any topic you want",
      slug: "general-discussion",
    },
    {
      _id: forum2Id,
      title: "Job Requests",
      subtitle: "Post here job opportunities",
      slug: "job-requests",
    },
    {
      _id: forum3Id,
      title: "Developer Jokes",
      subtitle: "Just funny developing stuff",
      slug: "developer-jokes",
    },
  ],
  topics: [
    {
      _id: topic1Id,
      title: "How to learn JS",
      slug: "how-to-learn-js",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      _id: topic2Id,
      title: "How to learn JAVA",
      slug: "how-to-learn-java",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn C++",
      slug: "how-to-learn-c++",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
  ],
};

module.exports = data;
