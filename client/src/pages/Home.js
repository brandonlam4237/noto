import { useEffect, useState } from "react";
import "../assets/scss/home.scss";
import Noteform from "../components/Noteform";
import { useNotesContext } from "../hooks/useNotesContext";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const { notes, dispatch } = useNotesContext();

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
    700: 1,
  };

  return (
    <div className="home">
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
    </div>
  );
}

export default Home;
