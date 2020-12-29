import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./FolderList.css";

export default function FolderList(props) {
  return (
    <div className="NoteListNav">
      <ul className="NoteListNav__list">
        {props.folders.map((folder) => (
          <li key={folder.id}>
            <NavLink
              className="NoteListNav__folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

FolderList.defaultProps = {
  folders: [],
};
