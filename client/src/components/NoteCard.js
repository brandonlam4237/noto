import "../assets/scss/notecard.scss";
import trash from "../assets/icons/trash.png";
import edit from "../assets/icons/edit.png";
import lock from "../assets/icons/lock.png";
import unlock from "../assets/icons/unlock.png";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import EditNote from "./EditNote";
import LockNoteForm from "./LockNoteForm";
import LockedNote from "./LockedNote";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function NoteCard({ note }) {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [EditFormOpen, setEditFormOpen] = useState(false);
  const [LockFormOpen, setLockFormOpen] = useState(false);
  const [lockedState, setLockedState] = useState(note.locked);
  const [id] = useState(note._id);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);
  const [locked, setLocked] = useState(note.locked);

  const handleDelete = async () => {
    if (!user) return;
    const response = await fetch(
      "http://localhost:3001/api/notes/" + note._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  const handleUnlockPerma = async (e) => {
    //e.preventDefault();
    if (!user) {
      return;
    }
    var note = {
      title,
      content,
      color,
      locked: false,
      password: "",
    };
    const response = await fetch("http://localhost:3001/api/notes/" + id, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log("Note submission error");
      console.log(id);
    }
    if (response.ok) {
      console.log("Note Unlocked", json);
      dispatch({ type: "UPDATE_NOTE", payload: json });
      setLocked(false);
      setLockedState(false);
      // refetch notes to update visually
      const fetchNotes = async () => {
        const response = await fetch("http://localhost:3001/api/notes", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_NOTES", payload: json });
        }
      };
      fetchNotes();
    }
  };

  return (
    <div className="note">
      {!locked && (
        <div>
          <div className="header" style={{ backgroundColor: note.color }}>
            <div className="title">
              {lockedState && (
                <img
                  src={unlock}
                  className="big-icon"
                  alt="unlocked"
                  onClick={() => {
                    setLocked(true);
                  }}
                  onMouseOver={(e) => (e.currentTarget.src = lock)}
                  onMouseOut={(e) => (e.currentTarget.src = unlock)}
                />
              )}
              <div>{note.title}</div>
            </div>
            <div className="options">
              {!lockedState && (
                <Tippy
                  content={
                    <span style={{ color: "white", letterSpacing: "1.5px" }}>
                      Lock Note
                    </span>
                  }
                >
                  <img
                    src={lock}
                    onClick={() => {
                      setLockFormOpen(true);
                    }}
                    alt="lock"
                  />
                </Tippy>
              )}
              {lockedState && (
                <Tippy
                  content={
                    <span style={{ color: "white", letterSpacing: "1.5px" }}>
                      Remove Lock
                    </span>
                  }
                >
                  <img src={unlock} alt="unlock" onClick={handleUnlockPerma} />
                </Tippy>
              )}
              <Tippy
                content={
                  <span style={{ color: "white", letterSpacing: "1.5px" }}>
                    Edit Note
                  </span>
                }
              >
                <img
                  src={edit}
                  onClick={() => {
                    setEditFormOpen(true);
                  }}
                  alt="edit"
                />
              </Tippy>
              <Tippy
                content={
                  <span style={{ color: "white", letterSpacing: "1.5px" }}>
                    Delete Note
                  </span>
                }
              >
                <img src={trash} onClick={handleDelete} alt="trash" />
              </Tippy>
            </div>
          </div>
          <div className="content">{note.content}</div>
          {EditFormOpen && (
            <EditNote
              closeForm={() => setEditFormOpen(false)}
              note={note}
              _setTitle={setTitle}
              _setContent={setContent}
              _setColor={setColor}
            />
          )}
          {LockFormOpen && (
            <LockNoteForm
              closeForm={() => setLockFormOpen(false)}
              lockNote={() => {
                setLockedState(true);
                setLocked(true);
              }}
              note={note}
            />
          )}
        </div>
      )}
      {locked && <LockedNote note={note} unlockNote={() => setLocked(false)} />}
    </div>
  );
}

export default NoteCard;
