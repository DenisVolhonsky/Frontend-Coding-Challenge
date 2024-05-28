import React, { FC } from "react";
import { Task } from "@/index";
import { Divider } from "antd";

interface TaskWrapperProps {
  task: Task;
  children: React.ReactNode | React.ReactNode[];
}
export const TaskWrapper: FC<TaskWrapperProps> = ({
  task: { name, description, estimatedMinutes },
  children,
}) => (
  <div
    className={
      "w-full rounded overflow-hidden bg-white shadow-lg flex justify-center flex-col px-6 py-4 space-y-4"
    }
  >
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">{description}</p>
    <Divider />
    <div className={"flex flex-col items-center"}>{children}</div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {estimatedMinutes} min
      </span>
    </div>
  </div>
);
