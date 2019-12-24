import React from "react";
import { Router } from "@reach/router";
import PostList from "./PostList";
import AddPost from "./AddPost";
import EditPost from "./EditPost";


function App() {
  return (
    <Router>
      <PostList path="/" />
      <AddPost path="/add" />
      <EditPost path="/edit/:id" />
    </Router>
  );
}

export default App;