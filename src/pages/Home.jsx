const Home = ({ taskList, subjectList }) => {
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
  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Welcome Back 👋</h2>
      <h3>Total Tasks: {totalTasks}</h3>
      <h3>Completed: {completedTasks}</h3>
      <h3>Pending: {pendingTasks}</h3>
      <h3>
        Total Subjects:
        {totalSubjects}
      </h3>

      <h3>
        Average Attendance:
        {averageAttendance}%
      </h3>
    </div>
  );
};

export default Home;
