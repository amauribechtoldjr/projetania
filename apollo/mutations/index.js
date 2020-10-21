import { gql } from "apollo-boost";

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $about_project: String) {
    createProject(input: { title: $title, about_project: $about_project }) {
      _id
      title
      about_project
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID, $title: String!, $about_project: String) {
    updateProject(
      id: $id
      input: { title: $title, about_project: $about_project }
    ) {
      _id
      title
      about_project
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID) {
    deleteProject(id: $id) {
      _id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $name: String
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        name: $name
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      name
      email
      role
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;
