import "../assets/scss/noteform.scss";

function Noteform({ closeForm }) {
  return (
    <div className="noteform">
      <form>
        <input type="text" placeholder="untitled" />
        <textarea type="text" className="input-content" />
        <button>ADD NOTE</button>
      </form>
      <div id="overlay" onClick={closeForm} />
    </div>
  );
}

export default Noteform;
