import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiContext from "../../ApiContext.js";
import { ApiEndpointNotes } from "../../config.js";
import ValidationError from "../ValidationError/ValidationError.js";
import PropTypes from "prop-types";
import "./AddNoteForm.css";

class AddNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      touched: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
    name: "",
    content: "",
  };
  static contextType = ApiContext;

  // form name validation
  updateNoteName(name) {
    this.setState({ name: name, touched: true });
  }

  validateNoteName() {
    const name = this.state.name;
    if (name.length === 0) {
      return "Please enter a name";
    }
  }

  // form content validation
  updateNoteContent(content) {
    this.setState({ content: content, touched: true });
  }

  validateNoteContent() {
    const content = this.state.content;
    if (content.length === 0) {
      return "The note can't be empty";
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
        this.props.handler();
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateNoteName();
    const contentError = this.validateNoteContent();
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
          <textarea
            name="noteContent"
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
          {this.state.touched && <ValidationError message={contentError} />}
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
          <button
            type="submit"
            disabled={(this.validateNoteName(), this.validateNoteContent())}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

AddNoteForm.propTypes = {
  history: PropTypes.object,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handler: PropTypes.func,
};

export default withRouter(AddNoteForm);
