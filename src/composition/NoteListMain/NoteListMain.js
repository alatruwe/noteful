import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note.js";
import "./NoteListMain.css";

export default function NoteListMain(props) {
  return (
    <section className="NoteListMain">
      <ul>
        {props.notes.map((note) => (
          <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
        ))}
      </ul>
    </section>
  );
}

NoteListMain.defaultProps = {
  notes: [],
};
