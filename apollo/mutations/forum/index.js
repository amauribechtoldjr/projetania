import { gql } from "apollo-boost";
import { TopicResponseFields, postResponseFields } from "@/apollo/queries";

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(
      input: { title: $title, content: $content, forumCategory: $forumCategory }
    ) {
      ${TopicResponseFields}
    }
  }
`;

export const CREATE_POST = gql`
mutation CreatePost(
  $topic: String
  $content: String
  $parent: String
) {
  createPost(
    input: { topic: $topic, content: $content, parent: $parent }
  ) {
    ${postResponseFields}
  }
}
`;
