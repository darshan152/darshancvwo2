import React from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function AddPost(Category) {

  //Function to add posts to the database
  const handleAdd = values => {
    const requestPosts = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 201) {
        window.history.back();
      }
    };
    requestPosts();
  };

  //Setting default value for category in formik
  let cat;
  if (Category.cat!="All"){
    cat = Category.cat;
  }else{
    cat = "";
  }

  //Fuction to ensure posts are not empty
  function validate(value){
    let error;
    if(!value){
      error = "Required";
    }
    return error;
  }


  return (
    <div>
      <h2 class="p-4">Add your post</h2>
      <div class= "p-2">
      <Formik
        initialValues={{
          type: "posts",
          attributes: {
            title: "",
            body: cat
          }
        }}
        onSubmit={handleAdd}
        render={() => (
          <Form>
            <Field class="m-2" type="text" validate={validate} name="attributes.title" placeholder="Title" />
            <br/>
            <Field class="m-2" type="text" validate={validate} name="attributes.body" placeholder="Category" />
            <br/>
            <button class="btn btn-primary mb-2" type="submit">Create</button>
          </Form>
        )}
      />
      </div>
      <button class="btn btn-info m-2" onClick={()=>window.history.back()}>
        Back
      </button>
    </div>
  );
}

export default AddPost;