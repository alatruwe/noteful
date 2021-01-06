import { Component } from "react";
import AddNoteForm from "../AddNoteForm/AddNoteForm.js";
import "./AddNoteButton.css";

export default class AddNoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState({
      showForm: false,
    });
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
          Add Note
        </button>
        {this.state.showForm && <AddNoteForm handler={this.handler} />}
      </div>
    );
  }
}
