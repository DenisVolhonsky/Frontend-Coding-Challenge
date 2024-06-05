import React, { FC, useState } from "react";
import { Task } from "@/index";
import { Button, notification, Popconfirm, Space, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { EditPatientModal } from "./EditPatientModal";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { PatientMedicationRowExpansion } from "./PatientMedicationRowExpansion";
import { Maybe, Patient } from "@/__generated__/graphql-generated";
import { TaskWrapper } from "@/components/TaskWrapper";
import { gql, useQuery } from "@apollo/client";

/**
 * The component `PatientList` consists of a table, a modal to edit a patient and a row expansion.
 * The table contains the properties of: name, date of birth and sex (address omitted).
 * Implement the calls `delete` and `create` patients in this component. Make sure that you don't refetch the list
 * after those operations. Use local cache updates instead.
 *
 * Please document your changes.
 */
export const PatientList: FC<Task> = (task) => {
  const [patient, setPatient] = useState<Patient | null>();

  /** Editable Code START **/

  // The Patient list task related to Apollo GraphQL is partially implemented at the data loading level.
  // The Patient medication task is not implemented at all.
  // This is because I haven't used these libraries in practice before.
  // Currently, I don't have enough time to understand and complete this task.
  // However, if this approach will be used in the project, I will be happy to learn and quickly get up to speed with this library.

  // definition of a GraphQL query
  // The query definition I conducted here locally because I couldn't access it externally. 
  //Only using third-party libraries to access it was permitted in the task.
  
  const LIST_PATIENTS = gql`
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
  const { loading, error, data } = useQuery(LIST_PATIENTS);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const patients: Maybe<Maybe<Patient>[]> = data?.listPatients
    ? data?.listPatients
    : [];

  const handleDelete = (patientId: Maybe<string>) => {
    notification.error({ message: `TODO delete patient with ID ${patientId}` });
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
      dataIndex: "dateOfBirth",
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
            onClick={() => setPatient(r)}
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

  const handleAdd = () => {
    notification.error({ message: "TODO" });
  };
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
