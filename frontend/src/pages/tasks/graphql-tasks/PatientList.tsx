import React, { FC, useState } from "react";
import { Task } from "@/index";
import { Button, notification, Popconfirm, Space, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { EditPatientModal } from "./EditPatientModal";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { PatientMedicationRowExpansion } from "./PatientMedicationRowExpansion";
import { Maybe, Patient } from "@/__generated__/graphql-generated";
import { TaskWrapper } from "@/components/TaskWrapper";
import { useQuery, useMutation } from "@apollo/client";
import { LIST_PATIENTS } from "@/graphql/queries";
import { CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT } from "@/graphql/mutations";
import uuid from "react-uuid";

/**
 * The component `PatientList` consists of a table, a modal to edit a patient and a row expansion.
 * The table contains the properties of: name, date of birth and sex (address omitted).
 * Implement the calls `delete` and `create` patients in this component. Make sure that you don't refetch the list
 * after those operations. Use local cache updates instead.
 *
 * Please document your changes.
 */
export const PatientList: FC<Task> = (task) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  /** Editable Code START **/
  const [patients, setPatients] = useState<readonly Patient[]>([]);

  // I added a query to fetch the list of patients from the server.
  const { loading, error } = useQuery(LIST_PATIENTS, {
    onCompleted: (data) => { // the same as useEffect(() => { if (data) {...} }, [data])
      setPatients(data.listPatients); // I added a callback to set the fetched patients into local state.
    },
  });

  // I added a mutation to delete a patient from the server.
  const [deletePatient] = useMutation(DELETE_PATIENT, {
    update(cache, { data: { deletePatient } }) { // I updated cache after mutation
      // I added a cache update to remove the deleted patient from the local cache.
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = existingPatients.listPatients.filter(
        (p: Patient) => p.id !== deletePatient
      );
      // I updated the local cache to reflect the removal of the patient.
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { listPatients: newPatients },
      });
      // I updated the local state to reflect the removal of the patient.
      setPatients(newPatients);
      notification.success({ message: "Patient deleted successfully" });
    },
    onError(err) {
      notification.error({
        message: `Failed to delete patient: ${err.message}`,
      });
    },
  });

  // I added a mutation to create a new patient on the server.
  const [createPatient] = useMutation(CREATE_PATIENT, {
    // I updated cache after mutation
    update(cache, { data: { createPatient } }) {
      // I added a cache update to add the new patient to the local cache.
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = [...existingPatients.listPatients, createPatient];
      // I updated the local cache with new patient data
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { listPatients: newPatients },
      });
      // I updated the local state to reflect the addition of the new patient.
      setPatients(newPatients);
      notification.success({ message: "Patient added successfully" });
    },
    onError(err) {
      notification.error({
        message: `Failed to add patient: ${err.message}`,
      });
    },
  });

  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    update(cache, { data: { updatePatient } }) {
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = existingPatients.listPatients.map((patient: Patient) =>
        patient.id === updatePatient.id ? updatePatient : patient
      );
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { listPatients: newPatients },
      });
      setPatients(newPatients);
      notification.success({ message: "Patient updated successfully" });
    },
    onError(err) {
      notification.error({
        message: `Failed to update patient: ${err.message}`,
      });
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (patientId: Maybe<string>) => {
    deletePatient({ variables: { deletePatientId: patientId } });
  };

  const handleEdit = (patient: Patient) => {
    setPatient(patient);
  };

  const handleAdd = () => {
    createPatient();
  };

  const handleSave = (updatedPatient: any) => {
    const formattedPatient = {
      id: patient?.id,
      name: {
        firstName: updatedPatient.firstName,
        lastName: updatedPatient.lastName,
        title: patient?.name?.title || "",
        middleNames: patient?.name?.middleNames || [],
      },
      address: {
        id: patient?.address?.id || uuid(),
        street: updatedPatient.street,
        houseNumber: updatedPatient.houseNumber,
        addition: updatedPatient.addition,
        city: updatedPatient.city,
      },
      dateOfBirth: updatedPatient?.dateOfBirth || null,
      sex: updatedPatient.sex,
    };
    updatePatient({ variables: { patient: formattedPatient } });
    setPatient(null);
  };

  const columns: ColumnProps<Patient>[] = [
    {
      key: "name",
      title: "Name",
      render: (_, record) => {
        const firstName = record.name?.firstName || "";
        const lastName = record.name?.lastName || "";
        return firstName && lastName ? `${firstName} ${lastName}` : "N/A";
      },
    },
    {
      key: "birthDate",
      title: "Date of Birth",
      render: (_, record) =>
        record.dateOfBirth
      ? new Date(record.dateOfBirth).toLocaleDateString('en-GB')
      : "N/A",
    },
    {
      key: "sex",
      title: "Sex",
      render: (_, record) => record.sex || "N/A",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, r) => (
        <Space>
          <EditTwoTone
            className={"cursor-pointer"}
            onClick={() => handleEdit(r)}
          />
          <Popconfirm
            title={"Are you sure?"}
            onConfirm={() => handleDelete(r.id)}
          >
            <DeleteTwoTone twoToneColor={"red"} className={"cursor-pointer"} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // I returned to the original state code after Editable Code END comment
  // I removed refetch() and replaced with local cache updates
  /** Editable Code END **/

  return (
    <TaskWrapper task={task}>
      <div className={"w-full"}>
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={patients?.map((patient) => patient!)}
          pagination={false}
          expandable={{
            expandedRowRender: (patient) => (
              <PatientMedicationRowExpansion patientId={patient.id} />
            ),
          }}
        />
        <EditPatientModal
          open={!!patient}
          onClose={() => setPatient(null)}
          patient={patient}
          onSave={handleSave}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={handleAdd}
          block
          type={"dashed"}
        >
          Add Patient
        </Button>
      </div>
    </TaskWrapper>
  );
};
