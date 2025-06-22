import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import WindowLayout from "../components/WindowLayout";

export default function Todo({ activeComponents, removeActiveComponent }) {
  const [taskTheme, setTaskTheme] = useState("bg-yellow-100");
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
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Todo"}
        windowIcon={"https://win98icons.alexmeub.com/icons/png/notepad-3.png"}
      >
        <div className={taskTheme}>
          <div className="flex flex-col flex-wrap p-2 gap-2">
            <div>
              <ul className="pl-4 list-disc">
                {tasks.map((task, index) => (
                  <div className="flex" key={index}>
                    <li
                      className="border-b border-blue-700 flex-grow"
                      style={{
                        width: "175px",
                        wordWrap: "break-word",
                        lineHeight: "1rem",
                      }}
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
                    placeholder=" task / note"
                    style={{ paddingLeft: "10px" }}
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
        </div>
      </WindowLayout>
    </div>
  );
}
