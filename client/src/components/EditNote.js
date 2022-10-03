import { useNotesContext } from "../hooks/useNotesContext";
import { useState } from "react";

function EditNote({ closeForm, note, _setTitle, _setContent, _setColor }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);
  const { dispatch } = useNotesContext();
  const [id] = useState(note._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var note = { title, content, color };
    if (title === "") {
      note = { title: "untitled", content, color };
    }

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
      if (title === "") {
        _setTitle("untitled");
      } else {
        _setTitle(title);
      }
      _setContent(content);
      _setColor(color);
      // refetch notes to update visually
      const fetchNotes = async () => {
        const response = await fetch("http://localhost:3001/api/notes");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_NOTES", payload: json });
        }
      };
      fetchNotes();
    }
  };

  return (
    <div className="noteform" onSubmit={handleSubmit}>
      <form>
        <input
          type="text"
          placeholder="untitled"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          style={{ backgroundColor: color }}
        />
        <textarea
          type="text"
          className="input-content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <div className="radio">
          <input
            type="radio"
            value="#fdd2d2"
            id="radio0"
            name="color"
            onChange={(e) => setColor(e.target.value)}
            defaultChecked
          />
          <label
            htmlFor="radio0"
            style={{ backgroundColor: "#fdd2d2" }}
          ></label>
          <input
            type="radio"
            value="#c3e5e9"
            id="radio1"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label
            htmlFor="radio1"
            style={{ backgroundColor: "#c3e5e9" }}
          ></label>
          <input
            type="radio"
            value="#f2d2ad"
            id="radio2"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label
            htmlFor="radio2"
            style={{ backgroundColor: "#f2d2ad" }}
          ></label>
          <input
            type="radio"
            value="#e9d8f0"
            id="radio3"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label
            htmlFor="radio3"
            style={{ backgroundColor: "#e9d8f0" }}
          ></label>
          <input
            type="radio"
            value="#caecce"
            id="radio4"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label
            htmlFor="radio4"
            style={{ backgroundColor: "#caecce" }}
          ></label>
        </div>
        <button style={{ backgroundColor: color }}>UPDATE NOTE</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default EditNote;
