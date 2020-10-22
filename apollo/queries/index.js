import { gql } from "apollo-boost";

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      _id
      title
      about_project
    }
  }
`;

export const GET_PROJECT = gql`
  query Project($id: ID) {
    project(id: $id) {
      _id
      title
      about_project
    }
  }
`;

export const USER_PROJECTS = gql`
  query UserProjects {
    userProjects {
      _id
      title
      about_project
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      name
      role
    }
  }
`;
