import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [subjectList, setSubjectList] = useState(() => {
    const storedSubjects = localStorage.getItem("subjects");
    return storedSubjects ? JSON.parse(storedSubjects) : [];
  });

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjectList));
  }, [subjectList]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 ${darkTheme ? "dark" : ""}`}
    >
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Routes>
        <Route
          path="/"
          element={<Home taskList={taskList} subjectList={subjectList} />}
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
