import "../assets/scss/notecard.scss";
import trash from "../assets/icons/trash.png";
import edit from "../assets/icons/edit.png";
import { useNotesContext } from "../hooks/useNotesContext";
import { useState } from "react";
import EditNote from "./EditNote";

function NoteCard({ note }) {
  const { dispatch } = useNotesContext();
  const [EditFormOpen, setEditFormOpen] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:3001/api/notes/" + note._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  return (
    <div className="note">
      <div className="header" style={{ backgroundColor: note.color }}>
        <div className="title">{note.title}</div>
        <div className="options">
          <img
            src={edit}
            onClick={() => {
              setEditFormOpen(true);
            }}
            alt="edit"
          />
          <img src={trash} onClick={handleDelete} alt="trash" />
        </div>
      </div>
      <div className="content">{note.content}</div>
      {EditFormOpen && (
        <EditNote closeForm={() => setEditFormOpen(false)} note={note} />
      )}
    </div>
  );
}

export default NoteCard;
