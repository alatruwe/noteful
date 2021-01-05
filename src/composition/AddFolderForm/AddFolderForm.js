import React, { Component } from "react";
import "./AddFolderForm.css";
import { ApiEndpointFolders } from "../../config.js";
import ApiContext from "../../ApiContext.js";
import PropTypes from "prop-types";

export default class AddFolderForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <form
        className="add__folder__form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <div>
          <label htmlFor="add__folder">New folder:</label>
          <input type="text" name="folderName" id="folderName" />
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

AddFolderForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
