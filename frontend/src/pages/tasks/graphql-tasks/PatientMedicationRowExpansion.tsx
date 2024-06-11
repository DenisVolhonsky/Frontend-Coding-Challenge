import React, { FC } from "react";
import { Alert, Table } from "antd";
import { Maybe, Medication } from "@/__generated__/graphql-generated";
import { useQuery } from "@apollo/client";
import { LIST_PATIENT_MEDICATIONS } from "@/graphql/queries";

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
  const { data, loading, error } = useQuery(LIST_PATIENT_MEDICATIONS, {
    variables: { patientId },
  });

  if (loading) {
    return <Alert type="info" message="Loading medications..." />;
  }

  if (error) {
    return <Alert type="error" message="Error loading medications" />;
  }

  const columns = [
    {
      title: "NDC Code",
      dataIndex: "ndcCode",
      key: "ndcCode",
      width: '50%',
      render: (_: string, record: Medication) => `${record.labeler}-${record.productCode}-${record.packageCode}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
  ];

  return (
    <Table
      rowKey={(record) => `${record.patientId}-${record.labeler}-${record.productCode}-${record.packageCode}`} // unique key for each medication
      columns={columns}
      dataSource={data?.listPatientMedications || []}
      pagination={false}
      style={{ margin: '0 16px 16px 16px'}}
    />
  );
/** Editable Code END **/
};
