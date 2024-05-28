import React, { FC, useEffect, useState } from "react";
import { Task } from "@/index";
import { Form, Input, notification, Radio } from "antd";
import { TaskWrapper } from "@/components/TaskWrapper";

/** Editable Code START **/

/**
 * The `OddEvenNumberInput` is a wrapper for the antd component `[Input](https://ant.design/components/input)` that only allows to enter
 * either odd or even number.
 * The property `odd` indicates the allowed characters.
 * Negative values are not allowed.
 *
 * Please document your changes.
 */
interface OddNumberInputProps {
  odd: boolean;
}

const OddEvenNumberInput: FC<OddNumberInputProps> = () => <Input />;
/** Editable Code END **/

/**
 * Additionally to the `OddEvenNumberInput` we want to clear the (invalid) input of the field and
 * focus the input field after changing the `odd` flag.
 * The clearing of the value is already implemented. However, the focusing still has to be done.
 */
export const CustomComponent: FC<Task> = (task) => {
  const [odd, setOdd] = useState<boolean>(true);

  /** Editable Code START **/
  const focusInput = () => {
    notification.error({ message: "TODO" });
  };
  /** Editable Code END **/

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(undefined);
    focusInput();
  }, [odd]);

  return (
    <TaskWrapper task={task}>
      <Form layout={"vertical"} className={"flex space-x-2"}>
        <Form.Item label={"Odd switcher"}>
          <Radio.Group
            options={[
              { label: "Odd", value: "true" },
              { label: "Even", value: "false" },
            ]}
            onChange={(value) => setOdd(value.target.value === "true")}
            value={`${odd}`}
            optionType="button"
          />
        </Form.Item>
        <Form.Item label={odd ? "Odd number input" : "Even number input"}>
          <OddEvenNumberInput
            odd={odd}
            /** Editable Code START **/
            // TODO: uncomment these lines after your implementation
            // value={value}
            // onChange={e => setValue(e.target.value)}
            /** Editable Code END **/
          />
        </Form.Item>
      </Form>
    </TaskWrapper>
  );
};
