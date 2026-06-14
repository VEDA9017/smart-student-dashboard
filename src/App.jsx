import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";

const App = () => {
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [subjectList, setSubjectList] = useState(() => {
    const storedSubjects = localStorage.getItem("subjects");
    return storedSubjects ? JSON.parse(storedSubjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjectList));
  }, [subjectList]);

  return (
    <div>
      <Navbar />
      {/* <h1>Hi! Welcome to Smart Student Dashboard...</h1> */}
      <Routes>
        <Route
          path="/"
          element={<Home taskList={taskList} subjectList={subjectList}       />}
        />
        <Route
          path="/tasks"
          element={<Tasks taskList={taskList} setTaskList={setTaskList} />}
        />
        <Route
          path="/attendance"
          element={
            <Attendance
              subjectList={subjectList}
              setSubjectList={setSubjectList}
            />
          }
        />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
};

export default App;
