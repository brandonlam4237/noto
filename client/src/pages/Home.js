import { useEffect, useState } from "react";
import "../assets/scss/home.scss";
import Noteform from "../components/Noteform";
import NoteFormInit from "../components/NoteFormInit";
import { useNotesContext } from "../hooks/useNotesContext";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const { notes, dispatch } = useNotesContext();
  const [formInitOpen, setFormInitOpen] = useState(false);
  const [initColor, setInitColor] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:3001/api/notes");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };
    fetchNotes();
  }, [dispatch]);

  const breakpoints = {
    default: 3,
    1100: 2,
    780: 1,
  };

  return (
    <div className="home">
      {notes !== null && notes.length < 1 && (
        <div className="empty-home">
          <div className="empty">
            <button
              style={{ backgroundColor: "#fdd2d2" }}
              onClick={() => {
                setInitColor("#fdd2d2");
                setFormInitOpen(true);
              }}
            />
            <button
              style={{ backgroundColor: "#c3e5e9" }}
              onClick={() => {
                setInitColor("#c3e5e9");
                setFormInitOpen(true);
              }}
            />
            <button
              style={{ backgroundColor: "#f2d2ad" }}
              onClick={() => {
                setInitColor("#f2d2ad");
                setFormInitOpen(true);
              }}
            />
            <button
              style={{ backgroundColor: "#e9d8f0" }}
              onClick={() => {
                setInitColor("#e9d8f0");
                setFormInitOpen(true);
              }}
            />
            <button
              style={{ backgroundColor: "#caecce" }}
              onClick={() => {
                setInitColor("#caecce");
                setFormInitOpen(true);
              }}
            />
          </div>
        </div>
      )}
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes &&
          notes.map((note) => {
            return <NoteCard key={note._id} note={note} />;
          })}
      </Masonry>
      <button
        className="add"
        onClick={() => {
          setFormOpen(true);
        }}
      >
        +
      </button>
      {formOpen && <Noteform closeForm={() => setFormOpen(false)} />}
      {formInitOpen && (
        <NoteFormInit
          closeForm={() => setFormInitOpen(false)}
          initColor={initColor}
        />
      )}
    </div>
  );
}

export default Home;
