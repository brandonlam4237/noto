import { useState } from "react";
import "../assets/scss/noteform.scss";
import { useNotesContext } from "../hooks/useNotesContext";

function Noteform({ closeForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fdd2d2");
  const { dispatch } = useNotesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var note = { title, content, color };
    if (title === "") {
      note = { title: "untitled", content, color };
    }
    const response = await fetch("http://localhost:3001/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log("Note submission error");
    }
    if (response.ok) {
      console.log("Note added", json);
      setTitle("");
      setContent("");
      setColor("#fdd2d2");
      closeForm();
      dispatch({ type: "CREATE_NOTE", payload: json });
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
          <label for="radio0" style={{ backgroundColor: "#fdd2d2" }}></label>
          <input
            type="radio"
            value="#c3e5e9"
            id="radio1"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label for="radio1" style={{ backgroundColor: "#c3e5e9" }}></label>
          <input
            type="radio"
            value="#f2d2ad"
            id="radio2"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label for="radio2" style={{ backgroundColor: "#f2d2ad" }}></label>
          <input
            type="radio"
            value="#e9d8f0"
            id="radio3"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label for="radio3" style={{ backgroundColor: "#e9d8f0" }}></label>
          <input
            type="radio"
            value="#caecce"
            id="radio4"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label for="radio0" style={{ backgroundColor: "#caecce" }}></label>
        </div>
        <button style={{ backgroundColor: color }}>ADD NOTE</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default Noteform;
