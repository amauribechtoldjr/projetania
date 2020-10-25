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
      createdAt
      isExpired @client
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

export const GET_FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      _id
      slug
      title
      subtitle
    }
  }
`;

export const GET_TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($slug: ID) {
    topicsByCategory(category: $slug) {
      _id
      slug
      title
      content
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;
