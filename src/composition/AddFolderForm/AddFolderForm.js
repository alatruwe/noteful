import React, { Component } from "react";
import "./AddFolderForm.css";
import { ApiEndpointFolders } from "../../config.js";
import ApiContext from "../../ApiContext.js";
import PropTypes from "prop-types";
import ValidationError from "../ValidationError/ValidationError.js";

export default class AddFolderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      touched: false,
    };
  }
  static defaultProps = {
    name: "",
  };
  static contextType = ApiContext;

  // folder name validation
  updateFolderName(name) {
    this.setState({ value: name, touched: true });
  }

  validateFolderName() {
    const name = this.state.value;
    if (name.length === 0) {
      return "Please enter a folder name";
    }
  }

  // POST request to add new folder
  handleSubmit = (event) => {
    event.preventDefault();
    const folderName = {
      name: event.target["folderName"].value,
    };

    fetch(ApiEndpointFolders, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folderName),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((folderName) => {
        this.context.addFolder(folderName);
        this.props.handler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const folderNameError = this.validateFolderName();
    return (
      <form
        className="add__folder__form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <div>
          <label htmlFor="add__folder">New folder:</label>
          <input
            type="text"
            name="folderName"
            id="folderName"
            onChange={(e) => this.updateFolderName(e.target.value)}
          />
          {this.state.touched && <ValidationError message={folderNameError} />}
        </div>

        <div>
          <button type="submit" disabled={this.validateFolderName()}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

AddFolderForm.propTypes = {
  handler: PropTypes.func,
  name: PropTypes.string.isRequired,
};
