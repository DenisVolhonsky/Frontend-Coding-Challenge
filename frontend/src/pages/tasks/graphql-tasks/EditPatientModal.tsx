import React, { FC } from "react";
import { Alert, Modal } from "antd";
import { Maybe, Patient } from "@/__generated__/graphql-generated";
import { buildFullName } from "@/utils/formatters";

interface PatientPreviewProps {
  patient: Maybe<Patient>;
  open: boolean;
  onClose: () => void;
}

/**
 * Task: Patient list
 *
 * The `EditPatientModal` allows the user to update all possible attributes of a patient.
 * Implement this component using [antd forms](https://ant.design/components/form). Choose suitable antd input components
 * for the corresponding patient properties.
 *
 * Hint: You might want to add an address formatter that works similar to the name formatter.
 *
 * Note: A patient object is valid as long as an id is set. All other fields are optional.
 *
 * Please document your changes.
 */
export const EditPatientModal: FC<PatientPreviewProps> = ({
  onClose,
  open,
  patient,
}) => {
  /** Editable Code START **/
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={patient?.name && buildFullName(patient?.name)}
    >
      <Alert type={"error"} message={"TODO"} />
    </Modal>
  );
  /** Editable Code END **/
};
