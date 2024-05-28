import React, { FC, useState } from "react";
import { Button, Col, Form, Input, InputProps, Row } from "antd";
import { Task } from "@/index";
import { buildFullName } from "@/utils/formatters";
import { TaskWrapper } from "@/components/TaskWrapper";
import { Maybe, NameFragment, Sex } from "@/__generated__/graphql-generated";

/**
 * PART 2: Patients have an attribute `sex`. Your task now is to create an input field that allows for the
 * selection of a patients sex (graphql type Sex). The selectable options are male | female | diverse.
 *
 * Have a look at the antd component [enum radio group](https://ant.design/components/radio)
 * as a template to create a component that looks and behaves the same way. The problem with this component is
 * that it does not allow to unselect values which is a crucial requirement for this task:
 * Selecting the currently selected value again must reset the value either to null or undefined.
 * Add a reasoning for your choice (null | undefined).
 *
 * Please try to stick with antd components to complete this task. Other solutions are also valid.
 *
 * Hint: have a look at the components [input](https://ant.design/components/input) and [button](https://ant.design/components/button).
 */
/** Editable Code START **/
interface SexInputProps {
  sex: Maybe<Sex>;
  onChange: (sex: Maybe<Sex>) => void;
}

const SexInput: FC<SexInputProps> = ({ sex, onChange }) => {
  return <div>TODO</div>;
};
/** Editable Code END **/

/**
 * PART 1: In this task we implemented a skeleton for a patient name input mask.
 * After submitting the form the patient credentials should be displayed in an alert (already implemented).
 * Additional requirement: The submission button must be disabled if the patient name is not complete.
 * The name can be considered as complete if the first and the last name are set.
 *
 * The state updates seem to work, but they can be improved. Think about how.
 *
 * NOTE: There has to be at least one state! (sex excluded: sex + a second one)
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const InputForms: FC<Task> = (task) => {

  /** Editable Code START **/

  const [title, setTitle] = useState<string>();
  const [middleNames, setMiddleNames] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const updateCredentials: InputProps["onChange"] = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "title":
        setTitle(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "middleNames":
        setMiddleNames(value.split(" "));
        break;
      default:
        return;
    }
  };

  const onSubmit = () => {
    const patientName: NameFragment = {
      firstName,
      lastName,
      title,
      middleNames,
    };
    const sex = null

    // Don't change the alert
    alert(`${buildFullName(patientName)} ${sex}`);
  };

  const disabled = false;

  /** Editable Code END **/

  return (
    <TaskWrapper task={task}>
      <Form layout={"vertical"}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label={"Title"}>
              <Input
                name={"title"}
                value={title}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"First name"}>
              <Input
                name={"firstName"}
                value={firstName}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Middle names"}>
              <Input
                name={"middleNames"}
                value={middleNames.join(" ")}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Last name"}>
              <Input
                name={"lastName"}
                value={lastName}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Sex"}>
              {/** Editable Code START **/}
              <SexInput sex={null} onChange={() => {}} />
              {/** Editable Code END **/}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button block onClick={onSubmit} disabled={disabled}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </TaskWrapper>
  );
};
