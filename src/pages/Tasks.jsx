import { useEffect, useState } from "react";
import { v4 } from "uuid";
import TaskCard from "../components/TaskCard";

const Tasks = ({ taskList, setTaskList }) => {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  const onAddTask = () => {
    if (task.trim() === "") return;

    if (editId) {
      const updatedtask = taskList.map((each) =>
        each.id === editId ? { ...each, task } : each,
      );
      setTaskList(updatedtask);
      setEditId(null);
    } else {
      const newTask = {
        id: v4(),
        task,
        completed: false,
      };

      setTaskList([...taskList, newTask]);
    }
    setTask("");
  };

  const onDeleteTask = (id) => {
    const filteredList = taskList.filter((each) => each.id !== id);

    setTaskList(filteredList);
  };

  const onToggleComplete = (id) => {
    const updatedList = taskList.map((each) =>
      each.id === id
        ? {
            ...each,
            completed: !each.completed,
          }
        : each,
    );
    setTaskList(updatedList);
  };

  const onEditTask = (taskItem) => {
    setTask(taskItem.task);
    setEditId(taskItem.id);
  };

  const filteredTasks = taskList.filter((each) => {
    if (filter === "completed") {
      return each.completed;
    }
    if (filter === "pending") {
      return !each.completed;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Tasks
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your tasks efficiently
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="Add New Task..."
              onChange={(e) => setTask(e.target.value)}
              value={task}
              className="flex-1 px-4 py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium shadow-sm text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={onAddTask}
              className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg dark:hover:shadow-blue-900/50 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-sm sm:text-base"
            >
              {editId ? "Update" : "Add Task"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                filter === "all"
                  ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                filter === "completed"
                  ? "bg-green-500 dark:bg-green-600 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              }`}
            >
              ✓ Completed
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                filter === "pending"
                  ? "bg-amber-500 dark:bg-amber-600 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              }`}
            >
              ⏳ Pending
            </button>
          </div>
        </div>

        <ul className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((each) => (
              <TaskCard
                key={each.id}
                task={each}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                onToggleComplete={onToggleComplete}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-8 sm:p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg font-medium">
                No tasks yet. Create one to get started! 🚀
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
