import "../assets/scss/lockform.scss";
import { useNotesContext } from "../hooks/useNotesContext";
import { useState } from "react";

function LockNoteForm({ closeForm, note, lockNote }) {
  const [password, setPassword] = useState("");
  const { dispatch } = useNotesContext();
  const [id] = useState(note._id);
  const [title] = useState(note.title);
  const [content] = useState(note.content);
  const [color] = useState(note.color);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var note = {
      title,
      content,
      color,
      locked: true,
      password: password,
    };
    const response = await fetch("http://localhost:3001/api/notes/" + id, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log("Note submission error");
      console.log(id);
    }
    if (response.ok) {
      console.log("Note Updated", json);
      closeForm();
      dispatch({ type: "UPDATE_NOTE", payload: json });

      // refetch notes to update visually
      const fetchNotes = async () => {
        const response = await fetch("http://localhost:3001/api/notes");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_NOTES", payload: json });
        }
      };
      fetchNotes();
      lockNote();
    }
  };
  return (
    <div className="lock-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button>Set Password</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default LockNoteForm;
