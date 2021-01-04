import React, { Component } from "react";
import ApiContext from "../../ApiContext.js";
import "./AddNoteForm.css";

export default class AddFolderForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folders = [] } = this.context;
    return (
      <form className="add__note__form">
        <div className="add__note__form__input">
          <label htmlFor="add__note">Name:</label>
          <input type="text" name="noteName" id="noteName" />
        </div>
        <div>
          <label htmlFor="add__note">Content:</label>
          <textarea />
        </div>
        <div>
          <label htmlFor="add__note">Folder:</label>
          <select>
            {folders.map((folder) => (
              <option key={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}
