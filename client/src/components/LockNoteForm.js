import "../assets/scss/lockform.scss";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

function LockNoteForm({ closeForm, note, lockNote }) {
  const [password, setPassword] = useState("");
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [id] = useState(note._id);
  const [title] = useState(note.title);
  const [content] = useState(note.content);
  const [color] = useState(note.color);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    var note = {
      title,
      content,
      color,
      locked: true,
      password: password,
    };
    const response = await fetch(
      "https://noto-server.up.railway.app/api/notes/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("Note submission error");
      console.log(id);
    }
    if (response.ok) {
      console.log("Note Updated", json);
      closeForm();
      dispatch({ type: "UPDATE_NOTE", payload: json });

      // refetch notes to update password
      const fetchNotes = async () => {
        const response = await fetch(
          "https://noto-server.up.railway.app/api/notes",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
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
      <form onSubmit={handleSubmit} style={{ backgroundColor: note.color }}>
        <div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="password"
          />
          <button>SET PASSWORD</button>
        </div>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default LockNoteForm;
