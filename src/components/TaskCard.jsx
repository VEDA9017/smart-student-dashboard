const TaskCard = ({ task, onDeleteTask, onEditTask, onToggleComplete }) => {
  return (
    <div>
      <li
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.task}
      </li>

      <button onClick={() => onToggleComplete(task.id)}>Complete</button>

      <button onClick={() => onEditTask(task)}>Edit</button>

      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
