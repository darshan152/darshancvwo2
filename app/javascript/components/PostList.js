import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";




function PostList() {
  const [posts, setPosts] = useState([]);
  let [display, setDisplay] = useState([]);
    
    
  useEffect(() => {
    const requestPosts = async () => {
      const response = await fetch("/api/posts");
      const { data } = await response.json();
      setPosts(data);
    };
    requestPosts();
  }, []);
    
  
  var categories = new Array();
  posts.map(post=>{
    categories.push(post.attributes.body)
  });
  let uniquecats =[...new Set(categories)];
  
  let options=uniquecats.map(cat=>{
    return (
      <option value={cat}>{cat}</option>
    )
  });
  
  function filteredposts(cat){
    if(cat=="All"){
      return(
        posts
      )
    }else{
      return(
       posts.filter(post=>post.attributes.body==cat)
      )
    }
  }
      
  
  function displayposts(cat) {
    let displayedcategory = cat == 'All' ? cat : cat.target.value
    let displayedpost = filteredposts(displayedcategory).map(post => {
      let wrap;
      let donebutton;
      if (post.attributes.done) {
        wrap = <p><del>{post.attributes.title}</del></p>
        donebutton=
        <button onClick={()=> navigate('/undo/'+post.id)}>
          Undo
       </button>
      } else {
        wrap = <p>{post.attributes.title}</p>
        donebutton=
        <button onClick={()=> navigate('/done/'+post.id)}>
        Done
        </button>
      }
    
      return(
        <div>
          <div>{wrap}</div>
          {donebutton}
          <button onClick={()=> navigate('/edit/'+post.id)}>
            Edit
          </button>
          <button onClick={()=> navigate('/del/'+post.id)}>
            Delete
          </button>
        </div>
      )
    })

    setDisplay(displayedpost);
  };




  return (
    <div>
   	  <h2>To-Do List</h2>
      <select onChange={displayposts} id="filterval">
        <option>Choose a Category</option>
        <option value="All">All</option>
        {options}
      </select>
      <br />
      
      {display}
      
      <br />
      <button onClick={() => navigate('/add')}>
  	    Add
  	  </button>
    </div>
  );
}

export default PostList;