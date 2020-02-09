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
      <div>
      <button class="btn btn-info btn-block" onClick={()=> navigate('/display/'+cat)}>{cat}</button>
      <br/>
      <br/>
      </div>
    )
  });

  return (
    <div>
      <h1 class= "p-4 text-center">To-Do List</h1>
      <div class="container">
        <div class="row">
          <div class="col">
            <button class="btn btn-info btn-block" onClick={()=> navigate('/display/All')}>
              All
            </button>
            <br/>
            <br/>
            {options}
          </div>
          <div class="col">
            <div class="float-sm-left">
              <button type="button" class="btn btn-primary ml-4" onClick={() => navigate('/add/All')}>
  	            Add more items
  	          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList2;