import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store";
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
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
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
      <ApiContext.provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.provider>
    );
  }
}

export default App;
