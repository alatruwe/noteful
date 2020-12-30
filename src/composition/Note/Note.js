import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../../ApiContext.js";
import "./Note.css";

export default class Note extends React.Component {
  static contextType = ApiContext;

  render() {
    const { id, name, modified } = this.context;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified <span className="Date">{modified}</span>
          </div>
        </div>
      </div>
    );
  }
}
