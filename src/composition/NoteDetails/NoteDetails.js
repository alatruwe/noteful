import React from "react";
import Note from "../Note/Note";
import ApiContext from "../../ApiContext.js";
import PropTypes from "prop-types";
import "./NoteDetails.css";

export default class NoteDetails extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const findNote = (notes = [], noteId) =>
      notes.find((note) => note.id === noteId);
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <section className="NotePageMain">
        <Note id={note.id} name={note.name} modified={note.modified} />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NoteDetails.propTypes = {
  match: PropTypes.object,
};
