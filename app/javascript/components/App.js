import React from "react";
import { Router } from "@reach/router";
import PostList from "./PostList";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import DonePost from "./DonePost";
import UndoDone from "./UndoDone";


function App() {
  return (
    <Router>
      <PostList path="/" />
      <AddPost path="/add" />
      <EditPost path="/edit/:id" />
      <DeletePost path="/del/:id" />
      <DonePost path="/done/:id"/>
      <UndoDone path="/undo/:id"/>
    </Router>
  );
}

export default App;