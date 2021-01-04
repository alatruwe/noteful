import React from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../../ApiContext.js";
import AddFolderButton from "../AddFolderButton/AddFolderButton.js";
import "./FolderList.css";

export default class FolderList extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders = [] } = this.context;
    return (
      <div className="FolderList">
        <ul className="FolderList__list">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className="FolderList__folder-link"
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <AddFolderButton />
      </div>
    );
  }
}

FolderList.defaultProps = {
  folders: [],
};
