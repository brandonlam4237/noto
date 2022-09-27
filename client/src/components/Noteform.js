import { useState } from "react";
import "../assets/scss/noteform.scss";

function Noteform({ closeForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var note = { title, content };
    if (title === "") {
      note = { title: "untitled", content };
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
      console.log("Note added");
      setTitle("");
      setContent("");
      closeForm();
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
        />
        <textarea
          type="text"
          className="input-content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <button>ADD NOTE</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default Noteform;
