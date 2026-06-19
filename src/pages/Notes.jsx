import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";

const Notes = () => {
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("all");
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
        starred: false,
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

  const onToggleStar = (id) => {
    const updatedNotes = notesList.map((each) =>
      each.id === id
        ? {
            ...each,
            starred: !each.starred,
          }
        : each,
    );
    setNotesList(updatedNotes);
  };

  const filteredNotes = notesList.filter((each) => {
    if (filter === "starred") {
      return each.starred;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
            Notes
          </h2>
          <p className="text-xl font-semibold sm:text-base text-gray-600 dark:text-gray-400">
            Create and manage your study notes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 mb-6 sm:mb-8">
          <textarea
            placeholder="Write Note..."
            onChange={(e) => setNote(e.target.value)}
            value={note}
            className="w-full px-4 py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium resize-none h-28 sm:h-32 shadow-sm text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={onAddNote}
            className="mt-4 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg dark:hover:shadow-blue-900/50 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-start sm:justify-end">
          <button
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm ${
              filter === "all"
                ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm ${
              filter === "starred"
                ? "bg-yellow-500 dark:bg-yellow-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
            }`}
            onClick={() => setFilter("starred")}
          >
            Starred
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((each) => (
              <li key={each.id} className="list-none">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 p-4 sm:p-6 h-full flex flex-col border-t-4 border-yellow-400 dark:border-yellow-500 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <p className="text-xl font-semibold sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1 break-words line-clamp-6 sm:line-clamp-8">
                      {each.text}
                    </p>
                    <button
                      onClick={() => onToggleStar(each.id)}
                      className="text-lg sm:text-2xl flex-shrink-0 hover:scale-110 transition-transform duration-300 text-yellow-400 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
                      title={each.starred ? "Unstar" : "Star"}
                    >
                      {each.starred ? (
                        <MdOutlineStar />
                      ) : (
                        <MdOutlineStarBorder />
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => onEditNote(each)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 font-bold rounded-lg sm:rounded-xl hover:bg-amber-200 dark:hover:bg-amber-800 hover:shadow-md transition-all duration-300 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteNote(each.id)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-bold rounded-lg sm:rounded-xl hover:bg-red-200 dark:hover:bg-red-800 hover:shadow-md transition-all duration-300 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-6 sm:p-8 md:p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg font-medium">
                No notes yet. Create one to get started! 📝
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
