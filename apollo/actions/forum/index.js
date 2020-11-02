import { useQuery, useMutation } from "@apollo/react-hooks";

import { CREATE_TOPIC, CREATE_POST } from "@/apollo/mutations/forum";
import {
  GET_FORUM_CATEGORIES,
  GET_TOPICS_BY_CATEGORY,
  GET_TOPIC_BY_SLUG,
  GET_POSTS_BY_TOPIC,
} from "@/apollo/queries";

export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORIES);
export const useGetTopicsByCategory = (variables) =>
  useQuery(GET_TOPICS_BY_CATEGORY, { variables });

export const useCreatePost = () => useMutation(CREATE_POST);

export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: GET_TOPICS_BY_CATEGORY,
          variables: {
            slug: createTopic.forumCategory.slug,
          },
        });

        cache.writeQuery({
          query: GET_TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [createTopic, ...topicsByCategory] },
          variables: {
            slug: createTopic.forumCategory.slug,
          },
        });
      } catch (e) {}
    },
  });

export const useGetTopicBySlug = (options) =>
  useQuery(GET_TOPIC_BY_SLUG, options);

export const useGetPostsByTopic = (options) =>
  useQuery(GET_POSTS_BY_TOPIC, options);
