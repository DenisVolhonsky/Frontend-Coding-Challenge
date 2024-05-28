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
const cache = new InMemoryCache();
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
