import React, { FC } from "react";
import {
  NavigationItem,
  codeFixingTasks,
  reactTasks,
  graphqlTasks,
} from "@/index";
import { Link, useLocation } from "react-router-dom";

interface NavigationGroup {
  key: string;
  title: string;
  tasks: NavigationItem[];
}

export const SideNavigation: FC = () => {
  const { pathname } = useLocation();

  const navigationGroups: NavigationGroup[] = [
    {
      key: "code-improvement",
      title: "Code improvement",
      tasks: codeFixingTasks(),
    },
    {
      key: "react-tasks",
      title: "React Tasks",
      tasks: reactTasks(),
    },
    {
      key: "gql-tasks",
      title: "Graphql Tasks",
      tasks: graphqlTasks(),
    },
  ];

  return (
    <nav
      className={"h-screen bg-gray-100 p-8 w-[250px] flex flex-col space-y-4"}
    >
      <ul className={"space-y-3"}>
        {navigationGroups.map(({ key, tasks, title }, index) => (
          <li key={key}>
            <h3 className={"font-semibold"}>
              {index + 1}. {title}
            </h3>
            <ul>
              {tasks.map((task, subIndex) => (
                <li
                  key={task.path}
                  className={
                    task.path === pathname ? "text-blue-900 ml-2" : "ml-2"
                  }
                >
                  <Link to={task.path!}>
                    {index + 1}.{subIndex + 1}. {task.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
