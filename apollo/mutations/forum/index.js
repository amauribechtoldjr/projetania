import { gql } from "apollo-boost";
import { TopicResponseFields } from "@/apollo/queries";

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
