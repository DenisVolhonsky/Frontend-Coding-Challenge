import {Medication, Resolvers} from "../__generated__/resolvers-types";

const medications: Medication[] = [
    {
        labeler: "50580",
        productCode: "488",
        packageCode: "10",
        patientId: "df61feac-e491-4b9d-af80-6898492dd31e",
        brand: "Tyenol"
    },
    {
        labeler: "0363",
        productCode: "0587",
        packageCode: "14",
        patientId: "df61feac-e491-4b9d-af80-6898492dd31e",
        brand: "Aspirin"
    },
]
export const medicationResolvers: Resolvers = {
    Query: {
        listPatientMedications: async (_, { patientId}) => {
            return medications.filter(medication => medication.patientId === patientId);
        },
    },
}