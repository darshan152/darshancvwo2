import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { render } from "react-dom";



  function DonePost(props) {
    //obtaining id of post
    const id = props.id;

    //function to mark post as done
    const handleDone = values => {
      const requestPosts = async () => {
        // We get the CSRF token generated by Rails to send it
        // as a header in the request to create a new post.
        // This is needed because with this token, Rails is going to
        // recognize the request as a valid request
        const csrfToken = document.querySelector("meta[name=csrf-token]").content;
        const response  = await fetch("/api/posts/" + id, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({ data: {id:id,type:"posts", attributes:{done:true}} })
        });
        {
          window.history.back();
        }
      };
      requestPosts();
      
    };
    
    //Calling function to mark post as done
    handleDone();
    
    return (
      null
    );
  }
  

export default DonePost;