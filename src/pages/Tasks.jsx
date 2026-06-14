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
    <div>
      <h2>Tasks Page...</h2>

      <input
        type="text"
        placeholder="Add New Task..."
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />

      <button onClick={onAddTask}>{editId ? "Update Task" : "Add Task"}</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      {/* <ul>
        {filteredTasks.map((eachTask) => (
          <div key={eachTask.id}>
            <li
              style={{
                textDecoration: eachTask.completed ? "line-through" : "none",
              }}
            >
              {eachTask.task}
            </li>

            <button onClick={() => onToggleComplete(eachTask.id)}>
              Complete
            </button>
            <button onClick={() => onEditTask(eachTask)}>Edit</button>
            <button onClick={() => onDeleteTask(eachTask.id)}>Delete</button>
          </div>
        ))}
      </ul> */}
      <ul>
        {filteredTasks.map((each) => (
          <TaskCard
            key={each.id}
            task={each}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
