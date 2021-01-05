import React, { Component } from "react";
import ApiContext from "../../ApiContext.js";
import ValidationError from "../ValidationError/ValidationError.js";
import "./AddNoteForm.css";

export default class AddFolderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      touched: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  updateNoteName(name) {
    this.setState({ value: name, touched: true });
  }

  validateNoteName() {
    const name = this.state.value;
    console.log(name);
    if (name.length === 0) {
      return "Please enter a name";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateNoteName();
    return (
      <form className="add__note__form" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="add__note__form__input">
          <label htmlFor="add__note">Name:</label>
          <input
            type="text"
            name="noteName"
            id="noteName"
            onChange={(e) => this.updateNoteName(e.target.value)}
          />
          {this.state.touched && <ValidationError message={nameError} />}
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
