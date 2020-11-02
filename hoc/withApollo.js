import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { fromUnixTime, differenceInDays } from "date-fns";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      uri: process.env.BASE_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Project: {
          isExpired({ createdAt }, args, { cache }) {
            const createdDate = fromUnixTime(createdAt / 1000);
            const diference = differenceInDays(new Date(), createdDate);

            return diference > 7 ? "Sim" : "Não";
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
