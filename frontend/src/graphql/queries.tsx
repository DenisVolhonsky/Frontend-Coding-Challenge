import { gql } from "@apollo/client";

// GraphQL query to list patients
export const LIST_PATIENTS = gql`
  query ListPatients {
    listPatients {
      id
      name {
        firstName
        lastName
        title
      }
      dateOfBirth
      sex
    }
  }
`;
