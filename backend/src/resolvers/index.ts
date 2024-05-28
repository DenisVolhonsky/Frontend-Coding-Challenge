import {Resolvers} from "../__generated__/resolvers-types";
import lodash from "lodash";
import {patientResolvers} from "./patient-resolvers";
import {GraphQLScalarType} from "graphql";
import {medicationResolvers} from "./medication-resolvers";

const dateScalar = new GraphQLScalarType({
    name: "Date",
    parseValue(value: string) {
        return new Date(value);
    },
    serialize(value: Date) {
        return value.toISOString();
    },
});

const scalarResolvers: Resolvers = {
    Date: dateScalar
}

export const resolvers: Resolvers = lodash.merge(
    scalarResolvers,
    patientResolvers,
    medicationResolvers
);
