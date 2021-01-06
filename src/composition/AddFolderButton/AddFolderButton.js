import { Component } from "react";
import AddFolderForm from "../AddFolderForm/AddFolderForm.js";
import "./AddFolderButton.css";

export default class AddFolderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  updateShowForm() {
    this.setState({
      showForm: true,
    });
  }
  render() {
    return (
      <div className="add__button__div">
        <button
          className="add__button"
          type="submit"
          onClick={(e) => this.updateShowForm(e)}
        >
          Add Folder
        </button>
        {this.state.showForm && <AddFolderForm />}
      </div>
    );
  }
}
