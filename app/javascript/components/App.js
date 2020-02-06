import React from "react";
import { Router } from "@reach/router";
import PostList2 from "./PostList2";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import DonePost from "./DonePost";
import UndoDone from "./UndoDone";
import DisplayPost from "./DisplayPost";
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing page
function App() {
  return (
    <Router>
      <PostList2 path="/" />
      <AddPost path="/add/:cat" />
      <EditPost path="/edit/:id" />
      <DeletePost path="/del/:id" />
      <DonePost path="/done/:id"/>
      <UndoDone path="/undo/:id"/>
      <DisplayPost path="/display/:cat"/>
    </Router>
  );
}

export default App;