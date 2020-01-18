import React, { Container, Row, Col , useEffect, useState } from "react";
import { navigate } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';



//Default page
function PostList2() {
  const [posts, setPosts] = useState([]);
    
  //Getting posts 
  useEffect(() => {
    const requestPosts = async () => {
      const response = await fetch("/api/posts");
      const { data } = await response.json();
      setPosts(data);
    };
    requestPosts();
  }, []);
    
  //Obtaining Categories
  var categories = new Array();
  posts.map(post=>{
    categories.push(post.attributes.body)
  });

  //Removing duplicates categories
  let uniquecats =[...new Set(categories)];
  
  //Storing category buttons in options variable
  let options=uniquecats.map(cat=>{
    return (
      <button onClick={()=> navigate('/display/'+cat)}>{cat}</button>
    )
  });

  return (
    <div>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
      <h1>To-Do List</h1>
      <div class="container">
        <div class="row">
          <div class="col">
            <button onClick={()=> navigate('/display/All')}>
              All
            </button>
            <br/>
            {options}
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" onClick={() => navigate('/add/All')}>
  	          Add
  	        </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList2;