import { Patient, Resolvers, Sex } from "../__generated__/resolvers-types";
import { randomUUID } from "crypto";
import { GraphQLError } from "graphql/error";
import { validate as isValidUUID } from "uuid";

let patients: Patient[] = [
  {
    id: "df61feac-e491-4b9d-af80-6898492dd31e",
    name: {
      firstName: "Frank",
      lastName: "Müller",
    },
    address: {
      id: randomUUID(),
      street: "Silly Road",
      houseNumber: "33",
    },
    dateOfBirth: new Date("1995-12-17T03:24:00"),
    sex: Sex.Male,
  },
  {
    id: randomUUID(),
    name: {
      title: "Dr.",
      firstName: "Petra",
      middleNames: ["Anna", "Günter", "Simon"],
      lastName: "Zwegat",
    },
    address: {
      id: randomUUID(),
      street: "Sesamstraße",
      houseNumber: "42",
      addition: "b",
    },
    dateOfBirth: new Date("1978-08-01T03:24:00"),
    sex: Sex.Female,
  },
  {
    id: randomUUID(),
    name: {
      title: "Prof. Dr.",
      firstName: "Isabella",
      lastName: "Mayer",
    },
    address: {
      id: randomUUID(),
      street: "Ainmillerstr.",
      houseNumber: "2",
      addition: "A",
    },
    dateOfBirth: new Date("1942-02-01T03:24:00"),
    sex: Sex.Diverse,
  },
];

export const patientResolvers: Resolvers = {
  Query: {
    listPatients: async () => {
      return patients;
    },
    getPatient: async (_, { id }) => {
      if (!id) {
        throw new GraphQLError("Missing id for patient");
      }

      if (!isValidUUID(id)) {
        throw new GraphQLError("Invalid UUID");
      }

      const patient = patients.find((patient) => patient.id === id);
      if (!patient) {
        throw new GraphQLError(`No patient found for id ${id}`);
      }
      return patient;
    },
  },
  Mutation: {
    createPatient: async () => {
      const newPatient = { id: randomUUID() };
      patients.push(newPatient);
      return newPatient;
    },
    deletePatient: async (_, { id }) => {
      if (!isValidUUID(id)) {
        throw new GraphQLError("Invalid UUID");
      }
      const index = patients.findIndex((patient) => patient.id === id);
      if (index !== -1) {
        patients.splice(index, 1);
        return id;
      }
      throw new GraphQLError(`Patient with id ${id} is not present`);
    },
    updatePatient: async (_, { patient: patientUpdate }) => {
      const patientId = patientUpdate.id;
      if (!patientId) {
        throw new GraphQLError("Missing id for patient");
      }

      if (!isValidUUID(patientId)) {
        throw new GraphQLError("Invalid UUID");
      }

      if (!patients.find((patient) => patient.id === patientId)) {
        throw new GraphQLError(`No patient found for id ${patientId}`);
      }

      patients = patients.map((patient) =>
        patient.id !== patientId ? patient : patientUpdate,
      );
      return patientUpdate;
    },
  },
};
