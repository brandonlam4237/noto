import { useState } from "react";
import "../assets/scss/noteform.scss";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

function Noteform({ closeForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fdd2d2");
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    var note = { title, content, color };
    if (title === "") {
      note = { title: "untitled", content, color };
    }
    const response = await fetch(
      "https://noto-server.up.railway.app/api/notes",
      {
        method: "POST",
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
          <motion.label
            whileHover={{ y: -8 }}
            htmlFor="radio0"
            style={{ backgroundColor: "#fdd2d2" }}
          ></motion.label>
          <input
            type="radio"
            value="#c3e5e9"
            id="radio1"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <motion.label
            whileHover={{ y: -8 }}
            htmlFor="radio1"
            style={{ backgroundColor: "#c3e5e9" }}
          ></motion.label>
          <input
            type="radio"
            value="#f2d2ad"
            id="radio2"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <motion.label
            whileHover={{ y: -8 }}
            htmlFor="radio2"
            style={{ backgroundColor: "#f2d2ad" }}
          ></motion.label>
          <input
            type="radio"
            value="#e9d8f0"
            id="radio3"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <motion.label
            whileHover={{ y: -8 }}
            htmlFor="radio3"
            style={{ backgroundColor: "#e9d8f0" }}
          ></motion.label>
          <input
            type="radio"
            value="#caecce"
            id="radio4"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <motion.label
            whileHover={{ y: -8 }}
            htmlFor="radio4"
            style={{ backgroundColor: "#caecce" }}
          ></motion.label>
        </div>
        <button style={{ backgroundColor: color }}>ADD NOTE</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default Noteform;
