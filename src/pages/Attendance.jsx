import { v4 } from "uuid";

const Attendance = ({ subjectList, setSubjectList }) => {
  const [subject, setSubject] = useState("");

  const onAddSubject = () => {
    if (subject.trim() === "") return;
    const newSubject = {
      id: v4(),
      name: subject,
      present: 0,
      absent: 0,
    };
    setSubjectList([...subjectList, newSubject]);
    setSubject("");
  };

  const updateAttendance = (id, type) => {
    const updatedTask = subjectList.map((each) =>
      each.id === id
        ? {
            ...each,
            [type]: each[type] + 1,
          }
        : each,
    );
    setSubjectList(updatedTask);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
            Attendance Tracker
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Track your attendance for each subject
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add Subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              className="flex-1 px-4 py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium shadow-sm text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={onAddSubject}
              className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg dark:hover:shadow-blue-900/50 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-sm sm:text-base"
            >
              Add Subject
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {subjectList.length > 0 ? (
            subjectList.map((eachSubject) => {
              const totalClasses = eachSubject.present + eachSubject.absent;
              const percentage =
                totalClasses === 0
                  ? 0
                  : ((eachSubject.present / totalClasses) * 100).toFixed(0);

              return (
                <li key={eachSubject.id} className="list-none">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 h-full flex flex-col hover:-translate-y-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 break-words">
                      {eachSubject.name}
                    </h3>

                    <div className="mb-4 sm:mb-5">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                            Attendance
                          </span>
                          <span
                            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                              percentage >= 75
                                ? "text-green-600 dark:text-green-400"
                                : percentage >= 50
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percentage >= 75
                                ? "bg-green-500 dark:bg-green-600"
                                : percentage >= 50
                                  ? "bg-amber-500 dark:bg-amber-600"
                                  : "bg-red-500 dark:bg-red-600"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800">
                        <p className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">
                          Present
                        </p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                          {eachSubject.present}
                        </p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-100 dark:border-red-800">
                        <p className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">
                          Absent
                        </p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                          {eachSubject.absent}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3 mt-auto">
                      <button
                        onClick={() =>
                          updateAttendance(eachSubject.id, "present")
                        }
                        className="flex-1 px-3 py-2 sm:py-2.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 font-bold rounded-lg sm:rounded-xl hover:bg-green-200 dark:hover:bg-green-800 hover:shadow-md transition-all duration-300 text-xs sm:text-sm"
                      >
                        ✓ Present
                      </button>
                      <button
                        onClick={() =>
                          updateAttendance(eachSubject.id, "absent")
                        }
                        className="flex-1 px-3 py-2 sm:py-2.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-bold rounded-lg sm:rounded-xl hover:bg-red-200 dark:hover:bg-red-800 hover:shadow-md transition-all duration-300 text-xs sm:text-sm"
                      >
                        ✗ Absent
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-6 sm:p-8 md:p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg font-medium">
                No subjects added yet. Add one to start tracking! 📚
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
