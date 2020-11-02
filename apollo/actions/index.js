import { useQuery } from "@apollo/react-hooks";

import { GET_HIGHLIGHT } from "@/apollo/queries";

export const useGetHighlight = (options) => useQuery(GET_HIGHLIGHT, options);
