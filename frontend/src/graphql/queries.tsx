import { gql } from "@apollo/client";

// I added GraphQL query to patients list
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

// I added GraphQL query to patient list of medications
export const LIST_PATIENT_MEDICATIONS = gql`
  query ListPatientMedications($patientId: String!) {
    listPatientMedications(patientId: $patientId) {
      labeler
      productCode
      packageCode
      brand
    }
  }
`;
