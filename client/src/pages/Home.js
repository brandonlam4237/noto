import { useState } from "react";
import "../assets/scss/home.scss";
import Noteform from "../components/Noteform";

function Home() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="home">
      Home Page
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
