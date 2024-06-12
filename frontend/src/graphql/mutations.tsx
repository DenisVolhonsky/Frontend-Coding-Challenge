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

// GraphQL mutation to update a patient
// middleNames excluded
export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($patient: PatientInput!) {
    updatePatient(patient: $patient) {
      id
      name {
        firstName
        lastName
        title
      }
      address {
        id
        street
        houseNumber
        addition
        city
      }
      dateOfBirth
      sex
    }
  }
`;
