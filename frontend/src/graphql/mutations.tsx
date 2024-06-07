import { gql } from "@apollo/client";

// GraphQL mutation to delete a patient
export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;

// GraphQL mutation to create a patient
export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      name {
        firstName
        lastName
      }
      dateOfBirth
      sex
    }
  }
`;
