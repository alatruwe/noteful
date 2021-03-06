import React from "react";
import ApiContext from "../../ApiContext.js";
import PropTypes from "prop-types";
import "./Folder.css";

export default class Folder extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const findNote = (notes = [], noteId) =>
      notes.find((note) => note.id === noteId);
    const note = findNote(notes, noteId) || {};
    const findFolder = (folders = [], folderId) =>
      folders.find((folder) => folder.id === folderId);
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        {folder && <h3 className="NotePageNav__folder-name">{folder.name}</h3>}
      </div>
    );
  }
}

Folder.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
