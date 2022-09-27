function NoteCard({ note }) {
  return (
    <div className="note">
      <div className="title">{note.title}</div>
      <div className="content">{note.content}</div>
    </div>
  );
}

export default NoteCard;
