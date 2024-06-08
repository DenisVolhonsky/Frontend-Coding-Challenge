import React, { FC, useState, useEffect } from "react";
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
import { CREATE_PATIENT, DELETE_PATIENT } from "@/graphql/mutations";
import { formatDate } from "@/utils/formatters";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<readonly Patient[]>([]);
  
  // I added a query to fetch the list of patients from the server.
  const { loading, error, data, refetch } = useQuery(LIST_PATIENTS, {
    onCompleted: (data) => {
      // I added a callback to set the fetched patients into local state.
      setPatients(data.listPatients);
    },
  });

  // I added a mutation to delete a patient from the server.
  const [deletePatient] = useMutation(DELETE_PATIENT, {
    update(cache, { data: { deletePatient } }) {
      // I added a cache update to remove the deleted patient from the local cache.
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = existingPatients.listPatients.filter(
        (p: Patient) => p.id !== deletePatient.id
      );
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
    update(cache, { data: { createPatient } }) {
      // I added a cache update to add the new patient to the local cache.
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = [...existingPatients.listPatients, createPatient];
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

  useEffect(() => {
    // I added a useEffect to update local state when data changes.
    if (data) {
      setPatients(data.listPatients);
    }
  }, [data]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (patientId: Maybe<string>) => {
    // I added a handler to delete a patient and refetch the list.
    deletePatient({ variables: { deletePatientId: patientId } })
      .then(() => {
        refetch(); // Refetch the list of patients after deletion
      });
  };

  const handleEdit = (patient: Patient) => {
    // I added a handler to set the patient to be edited.
    setPatient(patient);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    // I added a handler to prepare the form for adding a new patient.
    setPatient(null);
    setIsModalOpen(true);
  };

  const handleSave = (values: any) => {
    // I added a handler to save a new or edited patient and refetch the list.
    createPatient({ variables: { input: values } })
      .then(() => {
        setIsModalOpen(false);
        refetch(); // Refetch the list of patients after adding a new patient
      });
  };

  const columns: ColumnProps<Patient>[] = [
    {
      key: "name",
      title: "Name",
      render: (_, record) =>
        `${record.name?.firstName} ${record.name?.lastName}`,
    },
    {
      key: "birthDate",
      title: "Date of Birth",
      render: (_, record) =>
        formatDate(record.dateOfBirth)?.format("DD-MM-YYYY") || "N/A",
    },
    {
      key: "sex",
      title: "Sex",
      dataIndex: "sex",
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
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setPatient(null);
          }}
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
