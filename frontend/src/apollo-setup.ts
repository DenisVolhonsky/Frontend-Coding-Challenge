import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import omitDeep from "omit-deep-lodash";

/** Editable Code START **/
// I added a custom cache configuration to handle the 'listPatients' field
const cache = new InMemoryCache({
  // Define type policies to customize the behavior of the Apollo Client cache
  typePolicies: {
    Query: {
      fields: {
        // Customize the caching behavior for the 'listPatients' field
        listPatients: {
          // Define a merge function to handle incoming data for the 'listPatients' field
          merge(existing = [], incoming) {
            // By default, the merge function returns the incoming data, replacing the existing data
            return incoming;
          },
        },
      },
    },
  },
});
/** Editable Code END **/

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const cleanCallLink = new ApolloLink((operation, forward) => {
  const keysToOmit = ["__typename"]; // more keys like timestamps could be included here
  const def = getMainDefinition(operation.query);
  if (
    def &&
    "operation" in def &&
    (def.operation === "mutation" || def.operation === "query")
  ) {
    operation.variables = omitDeep(operation.variables, keysToOmit);
  }
  return forward ? forward(operation) : null;
});

export const client = new ApolloClient({
  link: from([cleanCallLink, httpLink]),
  cache,
});
