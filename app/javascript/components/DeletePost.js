import React, {Props} from "react";
import {navigate} from "@reach/router";
import {Formik, Field, Form} from "formik";

function DeletePost(props) {

  //Obtaining the ID of the post to be deleted
  const id = props.id;

  //Function to delete post from database
  const handleDelete = values => {
    const requestPosts = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response  = await fetch("/api/posts/" + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
       
      });

      if (response.status===204) {
        window.history.back();
      }
    };
    requestPosts();
  };

  return (
    <div>
      <h3 class="m-4">Delete Post?</h3>
      <button class="btn btn-danger m-2" onClick={()=>handleDelete()}>
        Delete
      </button>
      <button class="btn btn-info" onClick={()=> window.history.back()}>
        Back
      </button>
    </div>
  );
}

export default DeletePost;
