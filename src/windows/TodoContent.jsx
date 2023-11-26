import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function TodoContent({ setTaskTheme }) {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    "add your todos",
    "they are stored locally",
    "only for you to access",
    "they will be here next time",
    "you can click to delete/complete",
    "enjoy!",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCopyTask = (taskText) => {
    navigator.clipboard.writeText(taskText);
  };

  return (
    <>
      <div
        className="flex flex-col flex-wrap p-2 gap-2"
        style={
          {
            // fontFamily: "RobotoMonoRegular",
            // minWidth: "300px",
          }
        }
      >
        <div>
          <div className="flex flex-row">
            {/* <div className="">theme color:</div> */}
          </div>

          <ul className="pl-5 list-disc">
            {tasks.map((task, index) => (
              <div className="flex">
                <li
                  key={index}
                  className="border-b border-blue-700 flex-grow"
                  onClick={() => handleTaskClick(index)}
                  style={{
                    width: "175px",
                    wordWrap: "break-word",
                    lineHeight: "1rem",
                  }} // Add this style for word wrapping
                >
                  {task}
                </li>
                <span className=" flex items-center">
                  <i
                    className="pl-2 las la-copy hover:text-blue-700"
                    onClick={() => handleCopyTask(task)}
                    style={{ cursor: "pointer" }}
                    title="Copy"
                  ></i>
                  <i
                    onClick={() => handleTaskDelete(index)}
                    className="pl-2 las la-trash-alt mr-2 hover:text-red-700"
                    style={{ cursor: "pointer" }}
                    title="Delete"
                  ></i>
                </span>
              </div>
            ))}
          </ul>
        </div>

        <form onSubmit={handleAddTask}>
          <div className="flex">
            <div className="flex flex-grow">
              <input
                className="flex-grow"
                type="text"
                placeholder="task"
                // style={{ background: "transparent" }}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button className="font-bold bg-gray-300" type="submit">
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
