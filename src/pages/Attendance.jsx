import { useEffect, useState } from "react";
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
    <div>
      <h2>Attendance Page...</h2>
      <input
        type="text"
        placeholder="Add Subject"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
      />
      <button onClick={onAddSubject}>Add Subject</button>
      <ul>
        {subjectList.map((eachSubject) => {
          const totalClasses = eachSubject.present + eachSubject.absent;

          const percentage =
            totalClasses === 0
              ? 0
              : ((eachSubject.present / totalClasses) * 100).toFixed(0);

          return (
            <div key={eachSubject.id}>
              <h3>{eachSubject.name}</h3>

              <p>
                Present:
                {eachSubject.present}
              </p>

              <p>
                Absent:
                {eachSubject.absent}
              </p>

              <p>
                Attendance:
                {percentage}%
              </p>

              <button
                onClick={() => updateAttendance(eachSubject.id, "present")}
              >
                Present +
              </button>

              <button
                onClick={() => updateAttendance(eachSubject.id, "absent")}
              >
                Absent +
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Attendance;
