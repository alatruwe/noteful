import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store";
import FolderList from "./composition/FolderList/FolderList.js";
import NoteListMain from "./composition/NoteListMain/NoteListMain.js";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => (
              <FolderList folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
      </>
    );
  }

  renderMainRoutes() {
    const getNotesForFolder = (notes = [], folderId) =>
      !folderId ? notes : notes.filter((note) => note.folderId === folderId);

    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
