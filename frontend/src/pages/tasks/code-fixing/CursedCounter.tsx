import React, { FC, useState } from "react";
import { Button } from "antd";
import { TaskWrapper } from "@/components/TaskWrapper";
import { Task } from "@/index";

const MAGIC_NUMBER = 1;

/**
 * In this task you have to fix the state handling of the component.
 * The expected behavior is that the buttons increment and decrement the counter by the constant `MAGIC_NUMBER` twice using
 * two separate `setCounter` states.
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const CursedCounter: FC<Task> = (task) => {
  const [counter, setCounter] = useState<number>(0);

  /**
   * `incr` must increment the counter by the constant `MAGIC_NUMBER` **twice** using two separate setCounter calls
   */
  const incr = () => {
    /** Editable Code START **/
    setCounter(counter + MAGIC_NUMBER);
    setCounter(counter + MAGIC_NUMBER);
    /** Editable Code END **/
  };

  /**
   * `decr` must decrement the counter by the constant `MAGIC_NUMBER` **twice** using two separate setCounter calls
   */
  const decr = () => {
    /** Editable Code START **/
    setCounter(counter - MAGIC_NUMBER);
    setCounter(counter - MAGIC_NUMBER);
    /** Editable Code END **/
  };

  return (
    <TaskWrapper task={task}>
      <div className={"space-x-1"}>
        <Button onClick={decr}>-{MAGIC_NUMBER * 2}</Button>
        <Button onClick={incr}>+{MAGIC_NUMBER * 2}</Button>
      </div>
      <div className={"font-bold"}>Counter: {counter}</div>
    </TaskWrapper>
  );
};
