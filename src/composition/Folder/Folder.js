import React from "react";
import "./Folder.css";

export default function Folder(props) {
  return (
    <div className="NotePageNav">
      {props.folder && (
        <h3 className="NotePageNav__folder-name">{props.folder.name}</h3>
      )}
    </div>
  );
}

Folder.defaultProps = {
  history: {
    goBack: () => {},
  },
};
