# Avelios Medical Frontend Coding Challenge

## Technical Requirements

- Make sure that you have the node version `18.16.0 (lts)` installed ([nvm](https://github.com/nvm-sh/nvm))
- Make sure that you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- Make sure that no applications are running on the ports `3000` and `4000`


## Setup

For this task you have to run a local node backend as well as a local frontend.
Please make sure to start the backend before running the frontend.

## Tasks

After starting the frontend you will see a sidebar with several tasks that you should implement.

### Editable code snippets

For each task we defined the area of editable code (code that you are allowed to change in order to complete the task).

```typescript
/** Editable Code START **/
// you can do whatever you want here
// your comments also go here
/** Editable Code END **/
```

> **_NOTE:_**  This does not apply for additional imports that your component might require.

### Comments
Make sure that you document the steps that lead to your final solution in the comments before submitting the coding challenge.
This is essential for all tasks related to code quality. There is no need to comment out old code snippets.

**Example:**

```typescript
// 1. I removed the use-effect as it is not doing anything
// 2. I reduced the amounts of renders by...
// 3. The problem with xy was that...
```

### Code Quality

1. Make sure that your code is **clean**
2. Use consistent variable and file naming
3. Do not submit dead code
4. Do not leave commented out code snippets in your submission
3. **Remove all console logs before submitting the challenge**


### Backend (Port 4000)

You can find the backend in the folder [/backend](./backend).

To execute the backend change into the mentioned directory and execute:

```shell
yarn
```
to install all required dependencies. And

```shell
yarn start
```

to run the backend server.

After running the backend you should see a command line message stating:

```
🚀  Server ready at: http://localhost:4000/graphql
```

**❗Important: do not change anything within this project!**

After restarting the backend the state will be reset. This gives you to test your implementations deterministically.

### Frontend (Port 3000)

You can find the frontend in the folder [/frontend](./frontend). This folder contains a set of programming tasks which are marked as such.
You can derive all further implementation details in those files.

To execute the frontend change into the mentioned directory and execute:

```shell
yarn
```
to install all required dependencies. And

```shell
yarn start
```

to run the frontend server. 

**Hint:** After the execution you can access the frontend via the url [http://localhost:3000](http://localhost:3000) in your preferred browser.

## Graphql

All graphql changes that you make have to be done in the corresponding `*.graphql` files.
All required changes are marked as `TODO` comments. To build the typescript code run the following command:

```shell
yarn generate
```
This will create all hooks that you require to solve the tasks.


## Dos and Dont's

- Do not push your solution to GitHub (public repositories) or any other online platform
- You are **NOT** allowed to install any additional libraries
- You are allowed to use all online sources available
    - If you decide to copy/past source code from external resources (e.g. StackOverflow) that are neither **antd documentations** nor other documentations of installed libraries, add the corresponding references
    - You must be able to explain code snippets copy/pasted from external sources

## Useful resources
- [TypeScript](https://www.typescriptlang.org/)
- [React Hooks](https://react.dev/reference/react)
- [GraphQL](https://graphql.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)