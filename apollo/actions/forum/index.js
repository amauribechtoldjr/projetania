import { useQuery } from "@apollo/react-hooks";

import { GET_FORUM_CATEGORIES, GET_TOPICS_BY_CATEGORY } from "@/apollo/queries";

export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORIES);
export const useGetTopicsByCategory = (variables) =>
  useQuery(GET_TOPICS_BY_CATEGORY, { variables });
