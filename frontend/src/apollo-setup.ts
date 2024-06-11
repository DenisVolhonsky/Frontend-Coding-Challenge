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
const cache = new InMemoryCache({
  typePolicies: { // I defined caching policies for specific types and fields
    Query: { // schema.graphql has 'Query' type
      fields: {
        listPatientMedications: {
          // I specified 'patientId' as a key argument for caching this field
          keyArgs: ['patientId'],
          // Merge function is omitted because we do not need to customize merging behavior
        },
      },
    },
    Medication: { // schema.graphql has 'Medication' type
      // I defined key fields to uniquely identify 'Medication' objects
      keyFields: ['patientId', 'labeler', 'productCode', 'packageCode'],
    },
  },
  // Sometimes appeared warning that cache data may be lost when replacing the listPatients field of a Query object
  // But Apollo Cache works as expected!
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
