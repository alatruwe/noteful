import React from "react";
import { Link, withRouter } from "react-router-dom";
import ApiContext from "../../ApiContext.js";
import "./Note.css";
import { ApiEndpointNotes } from "../../config.js";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

class Note extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
    onDeleteNote: () => {},
  };
  static contextType = ApiContext;

  handleDeleteClick = (event) => {
    event.preventDefault();
    const notesId = this.props.id;
    const urlApiDelete = ApiEndpointNotes + "/" + notesId;

    fetch(urlApiDelete, {
      method: "DELETE",
      headers: {
        "content-type": "application-json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        this.props.history.push("/");
        this.context.deleteNote(notesId);
        this.props.onDeleteNote(notesId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { id, name, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified:{" "}
            <span className="Date">
              {format(parseISO(modified), "MMMM dd, yyyy")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Note);
