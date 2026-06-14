import { useEffect, useState } from "react";
import { v4 } from "uuid";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  const onAddNote = () => {
    if (note.trim() === "") return;

    if (editId) {
      const updatedNote = notesList.map((each) =>
        each.id === editId
          ? {
              ...each,
              text: note,
            }
          : each,
      );
      setNotesList(updatedNote);
      setEditId(null);
    } else {
      const newNote = {
        id: v4(),
        text: note,
      };
      setNotesList([...notesList, newNote]);
    }
    setNote("");
  };

  const onDeleteNote = (id) => {
    setNotesList(notesList.filter((each) => each.id !== id));
  };

  const onEditNote = (noteItem) => {
    setEditId(noteItem.id);
    setNote(noteItem.text);
  };
  return (
    <div>
      <h2>Notes Page...</h2>

      <textarea
        placeholder="Write Note..."
        onChange={(e) => setNote(e.target.value)}
        value={note}
      />
      <button onClick={onAddNote}>{editId ? "Update Note" : "Add Note"}</button>
      <ul>
        {notesList.map((each) => (
          <div key={each.id}>
            <p>{each.text}</p>
            <button onClick={() => onEditNote(each)}>Edit</button>
            <button onClick={() => onDeleteNote(each.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
