import react, { Component } from "react";
import AddFolderForm from "../AddFolderForm/AddFolderForm.js";

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
      <div>
        <button
          className="add__folder"
          type="submit"
          onClick={(e) => this.updateShowForm(e)}
        >
          Add
        </button>
        {this.state.showForm && <AddFolderForm />}
      </div>
    );
  }
}
