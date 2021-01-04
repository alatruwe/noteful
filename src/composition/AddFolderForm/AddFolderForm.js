import React, { Component } from "react";
import "./AddFolderForm.css";

export default class AddFolderForm extends Component {
  render() {
    return (
      <form className="add__folder__form">
        <div>
          <label htmlFor="add__folder">New folder:</label>
          <input type="text" name="add__folder" id="add__folder" />
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}
