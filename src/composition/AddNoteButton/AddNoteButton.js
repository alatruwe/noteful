import react, { Component } from "react";
import AddNoteForm from "../AddNoteForm/AddNoteForm.js";
import "./AddNoteButton.css";

export default class AddNoteButton extends Component {
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
      <div className="add__note">
        <button
          className="add__note__button"
          type="submit"
          onClick={(e) => this.updateShowForm(e)}
        >
          Add
        </button>
        {this.state.showForm && <AddNoteForm />}
      </div>
    );
  }
}