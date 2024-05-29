import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "antd";
import { Task } from "@/index";
import { randomIntArrayInRange, shuffle } from "@/utils/array-utils";
import { TaskWrapper } from "@/components/TaskWrapper";

/**
 * In this task you have to fix the state handling and the array operations of the component.
 * The expected behavior is to display two arrays with the following invariants:
 *    The `someArray` is an array of length 10 which gets randomly generated on page load.
 *    The `sortedArray` contains the same elements as the `someArray` sorted ascending.
 *    The button `Shuffle Array` should randomize the order of the elements of the `someArray`. Why is this not working?
 *
 * There are multiple things that have to be fixed and that can be improved. Also think about the render efficiency of this component.
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const ArraySorting: FC<Task> = (task) => {
  const [someArray, setSomeArray] = useState<number[]>([]);

  /** Editable Code START **/

  // I created a new random array function and set it to `someArray`
  // I wrapped function to useCallback for memoization
  const createNewRandomArray = useCallback(() => {
    const newArray = randomIntArrayInRange(12, 1000);
    setSomeArray(newArray);
  }, []);

  // I am calling createNewRandomArray function on page load
  useEffect(() => {
    createNewRandomArray();
  }, []);

  // Memoize sorted array to avoid unnecessary computations on re-renders
  const sortedArray = useMemo(() => {
    // I used copy of the array. Original array shouldn't be changed
    // I use it for predictable results
    return [...someArray].sort((a, b) => a - b); //
  }, [someArray]);

  /**
   * shuffleArray randomizes the order of the elements in `someArray`.
   * Hint: The implementation of `shuffle` is working and must not be changed.
   */

  const shuffleArray = useCallback(() => {
    // React doesn't see state changes
    // I create a copy of the array before shuffling
    const shuffledArray = shuffle([...someArray]);
    setSomeArray(shuffledArray);
  }, [someArray]);

  /** Editable Code END **/

  return (
    <TaskWrapper task={task}>
      <div className={"space-x-1"}>
        <Button onClick={createNewRandomArray}>New array</Button>
        <Button onClick={shuffleArray}>Shuffle array</Button>
      </div>
      <div className={"font-bold"}>
        <div>Current array: {someArray.join(", ")}</div>
        <div>Sorted array: {sortedArray.join(", ")}</div>
      </div>
    </TaskWrapper>
  );
};
