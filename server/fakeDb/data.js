const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

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
      info: "guest",
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
};

module.exports = data;
