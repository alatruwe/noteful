import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import FolderList from "./composition/FolderList/FolderList.js";
import NoteList from "./composition/NoteList/NoteList.js";
import NoteDetails from "./composition/NoteDetails/NoteDetails.js";
import Folder from "./composition/Folder/Folder.js";
import "./App.css";
import ApiContext from "./ApiContext";
import { ApiEndpointFolders, ApiEndpointNotes } from "./config.js";
import ListError from "./composition/ListError/ListError.js";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([fetch(ApiEndpointNotes), fetch(ApiEndpointFolders)])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (notesId) => {
    this.setState({
      notes: this.state.notes.filter((notes) => notes.id !== notesId),
    });
  };

  handleAddFolder = (folderName) => {
    this.setState({
      folders: [...this.state.folders, folderName],
    });
  };

  handleAddNote = (newNote) => {
    this.setState({
      notes: [...this.state.notes, newNote],
    });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={FolderList} />
        ))}
        <Route path="/note/:noteId" component={Folder} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteList} />
        ))}
        <Route path="/note/:noteId" component={NoteDetails} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <ListError>
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
          </ListError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <ListError>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </ListError>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
