import { useState } from "react";
import lock from "../assets/icons/lock.png";

function LockedNote({ note, unlockNote }) {
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const handleUnlock = () => {
    console.log(input, " and ", note.password);
    if (input === note.password) {
      console.log(input, " and ", note.password, " match");
      unlockNote();
    }
  };
  return (
    <div>
      {clicked && (
        <div>
          <input
            placeholder="password"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button onClick={handleUnlock}>Unlock</button>
        </div>
      )}
      {!clicked && (
        <img
          src={lock}
          onClick={() => {
            setClicked(true);
          }}
        />
      )}
    </div>
  );
}

export default LockedNote;
