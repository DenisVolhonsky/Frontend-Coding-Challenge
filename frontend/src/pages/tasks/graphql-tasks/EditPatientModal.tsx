import React, { FC, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
} from "antd";
import { Maybe, Patient } from "@/__generated__/graphql-generated";
import { buildFullName } from "@/utils/formatters";

interface PatientPreviewProps {
  patient: Maybe<Patient>;
  open: boolean;
  onClose: () => void;
  onSave: (values: Patient) => void;
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
  onSave,
}) => {
  /** Editable Code START **/
  const [form] = Form.useForm();

  const initialFormValues = {
    firstName: patient?.name?.firstName || "",
    lastName: patient?.name?.lastName || "",
    middleNames: patient?.name?.middleNames || [],
    dateOfBirth: patient?.dateOfBirth ? patient.dateOfBirth.split('T')[0] : null, // I cutted time from date
    sex: patient?.sex || null,
    houseNumber: patient?.address?.houseNumber || "",
    street: patient?.address?.street || "",
    city: patient?.address?.city || "",
    addition: patient?.address?.addition || "",
  };

  // I added function to handle form submission
  const handleFinish = (values: Patient) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values?.dateOfBirth || null, // Ensure dateOfBirth is explicitly set to null if not provided
    };
    onSave({ id: patient?.id, ...formattedValues });
  };

  // Effect hook to set form fields based on patient data
  useEffect(() => {
    if (form && patient) {
      form.setFieldsValue(initialFormValues);
    } else if (form) {
      form.resetFields();
    }
  // eslint-disable-next-line    
  }, [patient, form]);

  return (
    <Modal
      forceRender // Fix warning related to useForm instance not connected to any form element
      open={open}
      onCancel={onClose}
      footer={false}
      title={
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          {patient?.name ? buildFullName(patient.name) : ''}
        </div>
      }
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="horizontal"
        labelCol={{ span: 6 }} // Width of labels
        wrapperCol={{ span: 18 }} // Width of input fields
        initialValues={initialFormValues}
      >
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth" name="dateOfBirth">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Sex" name="sex">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="House Number" name="houseNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Street" name="street">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Addition" name="addition">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify="end">
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
  /** Editable Code END **/
};
