import React, { FC, useState } from "react";
import uuid from "react-uuid";
import { Button, Checkbox, Input, Modal, notification, Popconfirm } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Task } from "@/index";
import { TaskWrapper } from "@/components/TaskWrapper";

interface TodoItemProps {
  id: string;
  name: string;
  done: boolean;
}

/** Editable Code START **/

/**
 * This component represents a typical task (or `To-Do`) list. We already created the skeleton for you.
 * Your task is to improve this skeleton and to add the functionalities `create item`, `delete item` and mark
 * item as `done` / `to be done`.
 *
 * Deleting a to-do item must be confirmed by the user. You can use the component [Popconfirm](https://ant.design/components/popconfirm).
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const TodoList: FC<Task> = (task) => {
  // NOTE: Don't change the content of the initial items!
  const initialItems: TodoItemProps[] = [
    {
      id: uuid(),
      name: "Fix code",
      done: false,
    },
    {
      id: uuid(),
      name: "Implement delete",
      done: false,
    },
    {
      id: uuid(),
      name: "Implement add",
      done: false,
    },
  ];

  // 1. I changed newItem state to string for simpler handling of new item input
  const [newItem, setNewItem] = useState<string>("");
  // 2. I added setTodoItems to allow state updates for todo items list
  const [todoItems, setTodoItems] = useState<TodoItemProps[]>(initialItems);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 3. I created function to open the modal for adding a new item
  const openModal = () => {
    setIsModalVisible(true);
  };

  // 4. I created function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setNewItem("");
  };

  // 5. I created function to handle adding a new item to the list
  const handleAdd = () => {
    // Check if the new item input is not empty
    if (newItem.trim()) {
      const newItemProps = {
        id: uuid(),
        name: newItem.trim(),
        done: false,
      };
      // I added the new item to the todo items list
      setTodoItems([...todoItems, newItemProps]);
      notification.success({
        message: `Item "${newItem.trim()}" added successfully`,
      });
      closeModal();
    } else {
      // I added show an error notification if the input is empty
      notification.error({
        message: "Item name cannot be empty",
      });
    }
  };

  // 6. I added function to handle deleting an item from the list
  const handleDelete = (id: string) => {
    // Filter out the item with the given id from the todo items list
    setTodoItems(todoItems.filter((item) => item.id !== id));
    notification.success({
      message: `Item deleted successfully`,
    });
  };

  // 7. I added function to handle toggling the done state of an item
  const handleToggleDone = (id: string) => {
    // Update the done state of the item with the given id
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // 8. I updated the TodoItem component to support state changes and deletion confirmation
  const TodoItem: FC<TodoItemProps> = ({ done, name, id }) => (
    <div
      className={
        "w-full rounded overflow-hidden bg-white shadow-lg flex justify-between p-4"
      }
    >
      {name}
      <div className={"flex justify-content items-center space-x-4"}>
        <Checkbox checked={done} onChange={() => handleToggleDone(id)} />
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className={"cursor-pointer"} twoToneColor={"red"} />
        </Popconfirm>
      </div>
    </div>
  );

  return (
    <TaskWrapper task={task}>
      <div className={"w-full"}>
        <div className={"space-y-2"}>
          {todoItems.map((props) => (
            // 9. I added key prop to each TodoItem for efficient rendering
            <TodoItem key={props.id} {...props} />
          ))}
        </div>
        <Button
          block
          onClick={openModal}
          icon={<PlusOutlined />}
          type={"dashed"}
          className={"mt-4"}
        >
          Add item
        </Button>
        {/* 10. I added ToDoItemInput component for inputting new item details */}
        <ToDoItemInput
          open={isModalVisible}
          onCreate={handleAdd}
          newItem={newItem}
          setNewItem={setNewItem}
          closeModal={closeModal}
        />
      </div>
    </TaskWrapper>
  );
};

// 11. I created ToDoItemInput component for handling new item input and modal display
const ToDoItemInput: FC<{
  open: boolean;
  onCreate: () => void;
  newItem: string;
  setNewItem: (name: string) => void;
  closeModal: () => void;
}> = ({ onCreate, open, newItem, setNewItem, closeModal }) => {
  return (
    <Modal
      title={"New Item"}
      open={open}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={onCreate}>
          Create
        </Button>,
      ]}
    >
      <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
    </Modal>
  );
};

/** Editable Code END **/
