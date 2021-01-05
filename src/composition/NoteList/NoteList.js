import React from "react";
import Note from "../Note/Note.js";
import ApiContext from "../../ApiContext.js";
import AddNoteButton from "../AddNoteButton/AddNoteButton.js";
import PropTypes from "prop-types";
import "./NoteList.css";

export default class NoteList extends React.Component {
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
        <AddNoteButton />
      </section>
    );
  }
}

NoteList.propTypes = {
  match: PropTypes.arrayOf(
    PropTypes.shape({
      params: PropTypes.object,
    })
  ),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      content: PropTypes.string,
      modified: PropTypes.instanceOf(Date),
    })
  ),
};
