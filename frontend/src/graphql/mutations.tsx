import { gql } from "@apollo/client";

// GraphQL mutation to delete a patient
export const DELETE_PATIENT = gql`
mutation DeletePatient($deletePatientId: String) {
  deletePatient(id: $deletePatientId)
}
`;

// GraphQL mutation to create a patient
export const CREATE_PATIENT = gql`
  mutation CreatePatient {
    createPatient {
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
