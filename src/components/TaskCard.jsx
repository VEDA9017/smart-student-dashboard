const TaskCard = ({ task, onDeleteTask, onEditTask, onToggleComplete }) => {
  return (
    <li className="list-none">
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ${
          task.completed
            ? "border-l-4 border-green-400 dark:border-green-500 opacity-85"
            : "border-l-4 border-blue-500 dark:border-blue-400"
        }`}
      >
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm sm:text-base font-medium transition-all duration-300 break-words ${
              task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-800 dark:text-gray-200"
            }`}
          >
            {task.task}
          </p>
        </div>
        <div className="flex gap-2 sm:gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1 whitespace-nowrap ${
              task.completed
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 hover:shadow-md"
                : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-md"
            }`}
          >
            {task.completed ? "✓" : "Done"}
          </button>
          <button
            onClick={() => onEditTask(task)}
            className="flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800 hover:shadow-md transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 hover:shadow-md transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
