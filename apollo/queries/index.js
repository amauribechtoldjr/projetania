import { gql } from "apollo-boost";

export const TopicResponseFields = `
  _id
  slug
  title
  content
  createdAt
  user {
    username
    avatar
  }
  forumCategory {
    _id
    title
    slug
  }
`;

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
      ${TopicResponseFields}
    }
  }
`;

export const GET_TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${TopicResponseFields}
    }
  }
`;

export const postResponseFields = `
  _id
  content
  slug
  createdAt
  user {
    username
    avatar
  }
  parent {
    content
    user {
      username
      avatar
    }
  }
`;

export const GET_POSTS_BY_TOPIC = gql`
  query PostsByTopic ($slug: String) {
    postsByTopic(slug: $slug) {
      posts {
        ${postResponseFields}
      }
      count
    }
  }
`;
