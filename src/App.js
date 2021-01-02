import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import FolderList from "./composition/FolderList/FolderList.js";
import NoteListMain from "./composition/NoteListMain/NoteListMain.js";
import NoteDetails from "./composition/NoteDetails/NoteDetails.js";
import Folder from "./composition/Folder/Folder.js";
import "./App.css";
import ApiContext from "./ApiContext";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    const urlFolders = "http://localhost:9090/folders";
    const urlNotes = "http://localhost:9090/notes";

    Promise.all([fetch(urlNotes), fetch(urlFolders)])
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
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NoteDetails} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
