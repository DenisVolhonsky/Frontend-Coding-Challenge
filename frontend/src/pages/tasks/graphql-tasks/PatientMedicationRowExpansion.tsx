import React, { FC } from "react";
import { Alert } from "antd";
import { Maybe } from "@/__generated__/graphql-generated";

interface PatientMedicationRowExpansion {
  patientId: Maybe<string>;
}

/**
 * Task: Patient medication
 *
 * The `PatientMedicationRowExpansion` lists all the medications of a patient as a nested table.
 * The format of a medication has to follow the [NDC Standard](https://en.wikipedia.org/wiki/National_drug_code) and must be dash separated
 * and should also contain the brand name as a separate column.
 *
 * Hint: Medications don't contain ids. In order to keep the apollo cache stable you have to modify the file `apollo-setup.ts`. A medications
 * identifier could be derived combining the `patientId` + `labeler` + `productCode` + `packageCode`.
 *
 * Note: Only the first patient contains medications.
 *
 * Please document your changes.
 */
export const PatientMedicationRowExpansion: FC<
  PatientMedicationRowExpansion
> = ({ patientId }) => {
  /** Editable Code START **/
  return <Alert type={"error"} message={"TODO"} />;
  /** Editable Code END **/
};
