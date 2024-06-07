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
  // Using useQuery to fetch the list of patients
  const { loading, error, data } = useQuery(LIST_PATIENTS);
  const [deletePatient] = useMutation(DELETE_PATIENT, {
    update(cache, { data: { deletePatient } }) {
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      const newPatients = existingPatients.listPatients.filter(
        (p: Patient) => p.id !== deletePatient.id
      );
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { listPatients: newPatients },
      });
    },
  });

  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient } }) {
      const existingPatients: any = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: {
          listPatients: [...existingPatients.listPatients, createPatient],
        },
      });
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const patients: Maybe<Maybe<Patient>[]> = data?.listPatients
    ? data?.listPatients
    : [];
    
  // Handle delete operation
  const handleDelete = (patientId: Maybe<string>) => {
    deletePatient({ variables: { id: patientId } })
      .then(() => {
        notification.success({ message: "Patient deleted successfully" });
      })
      .catch((err) => {
        notification.error({
          message: `Failed to delete patient: ${err.message}`,
        });
      });
  };

  // Handle edit operation
  const handleEdit = (patient: Patient) => {
    setPatient(patient);
    setIsModalOpen(true);
  };

  // Handle add operation
  const handleAdd = () => {
    setPatient(null); // Reset patient to null for adding new patient
    setIsModalOpen(true);
  };

  // Handle save operation (create or update patient)
  const handleSave = (values: any) => {
    createPatient({ variables: { input: values } })
      .then(() => {
        notification.success({ message: "Patient added successfully" });
      })
      .catch((err) => {
        notification.error({
          message: `Failed to add patient: ${err.message}`,
        });
      });
    setIsModalOpen(false);
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
