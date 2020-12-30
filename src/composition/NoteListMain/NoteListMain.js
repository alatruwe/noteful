import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note.js";
import ApiContext from "../../ApiContext.js";
import "./NoteListMain.css";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const getNotesForFolder = (notes = [], folderId) =>
      !folderId ? notes : notes.filter((note) => note.folderId === folderId);
    const notesForFolder = getNotesForFolder(notes, folderId);

    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
