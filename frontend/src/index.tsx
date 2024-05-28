import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { CursedCounter } from "./pages/tasks/code-fixing/CursedCounter";
import { Home } from "./pages/Home";
import { NonIndexRouteObject } from "react-router/dist/lib/context";
import { ArraySorting } from "./pages/tasks/code-fixing/ArraySorting";
import { TodoList } from "./pages/tasks/react-tasks/TodoList";
import { InputForms } from "./pages/tasks/code-fixing/InputForms";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-setup";
import { CustomComponent } from "./pages/tasks/react-tasks/CustomComponent";
import { PatientList } from "./pages/tasks/graphql-tasks/PatientList";

export interface NavigationItem extends NonIndexRouteObject {
  name: string;
}

export interface Task {
  name: string;
  estimatedMinutes: number;
  description: string;
}

export function codeFixingTasks(): NavigationItem[] {
  return [
    {
      path: "/cursed-counter",
      element: (
        <CursedCounter
          name={"Cursed Counter"}
          estimatedMinutes={5}
          description={
            "Something is wrong with this counter. Inspect the code and fix it!"
          }
        />
      ),
      name: "Cursed Counter",
    },
    {
      path: "/array-sorting",
      element: (
        <ArraySorting
          name={"Array Sorting"}
          description={
            "Something is wrong with the array handling. Inspect the code and resolve the issues!"
          }
          estimatedMinutes={10}
        />
      ),
      name: "Array Sorting",
    },
    {
      path: "/input-forms",
      element: (
        <InputForms
          name={"Input Forms"}
          description={
            "There is nothing wrong here? Or is there? How can one improve this component? Also implement the missing sex input."
          }
          estimatedMinutes={10}
        />
      ),
      name: "Input Forms",
    },
  ];
}

export function reactTasks(): NavigationItem[] {
  return [
    {
      path: "/todo-list",
      element: (
        <TodoList
          name={"TODO List"}
          description={
            "Finish and fix the implementation of this todo list. It must be possible to add, delete and mark todo items as done / to be done."
          }
          estimatedMinutes={10}
        />
      ),
      name: "TODO List",
    },
    {
      path: "/custom-component",
      element: (
        <CustomComponent
          name={"Custom component"}
          description={
            "Implement a wrapper for an existing antd component (Input). " +
            "This custom wrapper should only allow users to enter numbers that are odd (1,3,5...) or even (2, 4, ...). Negative values are not allowed. " +
            "A property (odd: bool) inside the component props decides which user input to allow. Make sure to also allow the setting of references."
          }
          estimatedMinutes={15}
        />
      ),
      name: "Custom component",
    },
  ];
}

export function graphqlTasks(): NavigationItem[] {
  return [
    {
      path: "patient-list",
      element: (
        <PatientList
          name={"Patient list"}
          description={
            "Implement a table containing all patients in the list. We already created the skeleton for you. The table must allow the user" +
            " to create new patients, update existing ones and to delete them. Make sure to not refetch the table after add / delete operations. " +
            "Instead use the information sent back by the backend to update your cache locally."
          }
          estimatedMinutes={60}
        />
      ),
      name: "Patient list",
    },
    {
      path: "patient-medication",
      element: (
        <PatientList
          name={"Patient medication"}
          description={
            "In this task you have to extend the view created in the task Patient list by the patients medication. " +
            "Create a row expansion that lists the medications for the current expanded table row. " +
            "Please note that we only created mock data for the first patient in the list."
          }
          estimatedMinutes={30}
        />
      ),
      name: "Patient medication",
    },
  ];
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...codeFixingTasks(),
      ...reactTasks(),
      ...graphqlTasks(),
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
