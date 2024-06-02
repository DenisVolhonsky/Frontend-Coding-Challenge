import React, { FC, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Task } from "@/index";
import { Form, Input, notification, Radio } from "antd";
import type { InputRef } from 'antd';
import { TaskWrapper } from "@/components/TaskWrapper";

/** Editable Code START **/

/**
 * The `OddEvenNumberInput` is a wrapper for the antd component `[Input](https://ant.design/components/input)` that only allows the user to enter
 * either odd or even numbers.
 * The property `odd` indicates the allowed numbers.
 * Negative values are not allowed.
 * A ref can be passed to the input field to allow focusing or other actions.
 */
interface OddEvenNumberInputProps {
  odd: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// I used forwardRef to pass a ref from parent to child component to allow the parent to directly interact with the child's DOM node or component instance.
const OddEvenNumberInput = forwardRef<InputRef, OddEvenNumberInputProps>(({ odd, value, onChange }, ref) => {
  const inputRef = useRef<InputRef>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  // Allows the parent component to control the input's focus, blur, selection range, etc.
  useImperativeHandle(ref, () => ({
    focus: () => { 
      inputRef.current?.focus();
    },
    // we need this default methods only to avoid ts error related with interface InputRef 
    blur: () => {
      inputRef.current?.blur();
    },
    setSelectionRange: (start: number, end: number, direction?: "forward" | "backward" | "none") => {
      inputRef.current?.input?.setSelectionRange(start, end, direction);
    },
    select: () => {
      inputRef.current?.input?.select();
    },
    get input() {
      return inputRef.current?.input || null;
    }
  }));

  // Shows error notification if the input is invalid
  const showError = (message: string) => {
    if (lastError !== message) { // I prevented multiple notifications with the same type
      notification.error({ message });
      setLastError(message);
    }
  };

  // Validates the input data and passes changes to the parent component
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) { // Allow only numeric input
      const number = parseInt(inputValue, 10);
      if ((odd && number % 2 !== 0) || (!odd && number % 2 === 0)) {
        setLastError(null);
        onChange?.(e);  // the same as if (onChange) { onChange(e); }
      } else {
        showError(`Please enter an ${odd ? "odd" : "even"} number`);
      }
    } else {
      showError("Please enter a valid number");
    }
  };

  return <Input ref={inputRef} value={value} onChange={handleChange} />;
});
/** Editable Code END **/

/**
 * Additionally to the `OddEvenNumberInput` we want to clear the (invalid) input of the field and
 * focus the input field after changing the `odd` flag.
 * The clearing of the value is already implemented. However, the focusing still has to be done.
 */
export const CustomComponent: FC<Task> = (task) => {
  const [odd, setOdd] = useState<boolean>(true);
  const inputRef = useRef<InputRef>(null);

  /** Editable Code START **/
  const focusInput = () => {
    inputRef.current?.focus(); 
  };
  /** Editable Code END **/

  const [value, setValue] = useState<string>();

  // Clears the input value and focuses the input field when the `odd` flag changes
  useEffect(() => {
    setValue("");
    focusInput(); // Added focus on Input by default
  }, [odd]);

  // This handles and stores the input data and performs validation for odd/even numbers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) { // Allow only numeric input
      const number = parseInt(inputValue, 10);
      if ((odd && number % 2 !== 0) || (!odd && number % 2 === 0) || inputValue === "") {
        setValue(inputValue);
      } else {
        notification.error({ message: `Please enter an ${odd ? "odd" : "even"} number` });
      }
    } else {
      notification.error({ message: "Please enter a valid number" });
    }
  };

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
            ref={inputRef}
            odd={odd}
            value={value}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </TaskWrapper>
  );
};
