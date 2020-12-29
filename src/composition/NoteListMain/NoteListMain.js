import React from "react";
import { Link } from "react-router-dom";
import "./NoteListMain.css";

export default function NoteListMain(props) {
  return (
    <section className="NoteListMain">
      <ul>
        {props.notes.map((note) => (
          <li key={note.id}>{note.name}</li>
        ))}
      </ul>
    </section>
  );
}

NoteListMain.defaultProps = {
  notes: [],
};
