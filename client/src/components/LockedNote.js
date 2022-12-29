import { useState } from "react";
import lock from "../assets/icons/lock.png";
import unlock from "../assets/icons/unlock.png";
import "../assets/scss/lockednote.scss";

function LockedNote({ note, unlockNote }) {
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const handleUnlock = (e) => {
    e.preventDefault();
    console.log(input, " and ", note.password);
    if (input === note.password) {
      unlockNote();
    }
  };
  return (
    <div className="locked-note" style={{ backgroundColor: note.color }}>
      {clicked && (
        <form className="unlock" onSubmit={handleUnlock}>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button>UNLOCK</button>
        </form>
      )}
      {!clicked && (
        <img
          src={lock}
          alt="lock"
          onMouseOver={(e) => (e.currentTarget.src = unlock)}
          onMouseOut={(e) => (e.currentTarget.src = lock)}
          onClick={() => {
            setClicked(true);
          }}
        />
      )}
    </div>
  );
}

export default LockedNote;
