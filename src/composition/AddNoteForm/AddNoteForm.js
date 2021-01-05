import React, { Component } from "react";
import ApiContext from "../../ApiContext.js";
import { ApiEndpointNotes } from "../../config.js";
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

  // form name validation
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

  // POST request to add new note
  handleSubmit(event) {
    event.preventDefault();
    const newNote = {
      name: event.target["noteName"].value,
      content: event.target["noteContent"].value,
      folderId: event.target["folderId"].value,
      modified: new Date(),
    };

    fetch(ApiEndpointNotes, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((newNote) => {
        this.context.addNote(newNote);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <textarea name="noteContent" />
        </div>
        <div>
          <label htmlFor="add__note">Folder:</label>
          <select name="folderId">
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
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
