import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ taskList, subjectList }) => {
  const [starredNotes, setStarredNotes] = useState([]);

  // Load starred notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const notes = JSON.parse(storedNotes);
      setStarredNotes(notes.filter((note) => note.starred).slice(0, 3));
    }
  }, []);

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((each) => each.completed).length;
  const pendingTasks = taskList.filter((each) => !each.completed).length;
  const totalSubjects = subjectList.length;
  const totalAttendance = subjectList.reduce((sum, eachSubject) => {
    const totalClasses = eachSubject.present + eachSubject.absent;

    const percentage =
      totalClasses === 0 ? 0 : (eachSubject.present / totalClasses) * 100;
    return sum + percentage;
  }, 0);
  const averageAttendance =
    totalAttendance === 0 ? 0 : (totalAttendance / totalSubjects).toFixed(0);

  // Get recent tasks (latest 3)
  const recentTasks = [...taskList].reverse().slice(0, 3);

  const StatCard = ({ icon, title, value, color }) => (
    <div
      className={`bg-gradient-to-br ${color} rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-gray-100 dark:text-gray-300 text-xs sm:text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 break-words">
            {value}
          </p>
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl opacity-20 dark:opacity-10 flex-shrink-0 ml-2">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
            Student Dashboard
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Welcome Back 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            icon="📋"
            title="Total Tasks"
            value={totalTasks}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon="✅"
            title="Completed"
            value={completedTasks}
            color="from-green-500 to-green-600"
          />
          <StatCard
            icon="⏳"
            title="Pending"
            value={pendingTasks}
            color="from-amber-500 to-amber-600"
          />
          <StatCard
            icon="📚"
            title="Subjects"
            value={totalSubjects}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon="📊"
            title="Avg Attendance"
            value={`${averageAttendance}%`}
            color="from-indigo-500 to-indigo-600"
          />
        </div>

        {/* Recent Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Tasks Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 h-full">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  📝 Recent Tasks
                </h2>
                {recentTasks.length > 0 && (
                  <Link
                    to="/tasks"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-xs sm:text-sm hover:underline"
                  >
                    View All →
                  </Link>
                )}
              </div>

              {recentTasks.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 sm:p-4 rounded-xl border-l-4 transition-all ${
                        task.completed
                          ? "bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-500 opacity-75"
                          : "bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-500 hover:shadow-md"
                      }`}
                    >
                      <p
                        className={`text-sm sm:text-base font-medium break-words ${
                          task.completed
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {task.completed ? "✓ Completed" : "⏳ Pending"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">
                  No tasks yet.{" "}
                  <Link
                    to="/tasks"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Create one
                  </Link>{" "}
                  to get started! 🚀
                </p>
              )}
            </div>
          </div>

          {/* Motivational Card */}
          <div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 h-full text-white flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  💪 Today's Motivation
                </h3>
                <p className="text-sm sm:text-base leading-relaxed font-medium text-indigo-50 dark:text-indigo-200">
                  {pendingTasks > 0
                    ? `You have ${pendingTasks} pending task${pendingTasks !== 1 ? "s" : ""}. Take it step by step!`
                    : "Amazing! All tasks are complete! Keep up the great work! 🎉"}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-indigo-400/30 dark:border-indigo-600/30">
                <p className="text-xs sm:text-sm text-indigo-100 dark:text-indigo-300 font-semibold">
                  💡 Pro Tip: Break big tasks into smaller ones for better
                  progress tracking!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Starred Notes Section */}
        {starredNotes.length > 0 && (
          <div>
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ⭐ Starred Notes
                </h2>
                <Link
                  to="/notes"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-xs sm:text-sm hover:underline"
                >
                  View All →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {starredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 border-t-4 border-yellow-400 dark:border-yellow-500 hover:-translate-y-1 flex flex-col"
                >
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 line-clamp-4 sm:line-clamp-5 break-words flex-grow mb-3 sm:mb-4 leading-relaxed">
                    {note.text}
                  </p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-yellow-500 dark:text-yellow-400 font-semibold text-xs sm:text-sm">
                      ⭐ Starred
                    </span>
                    <Link
                      to="/notes"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs sm:text-sm font-semibold hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
