import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { array } from "prop-types";



function PostList() {
    const [posts, setPosts] = useState([]);
  
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
  console.log(uniquecats)
  
  let options=uniquecats.map(cat=>{
    return (
    <option value={cat} onClick={displayposts(cat)}>{cat}</option>
    )
  }
  );
  console.log(options)
  

  
  function filteredposts(cat){return(
    posts.filter(post=>post.attributes.body==cat))}

  function displayposts(cat){
    filteredposts(cat).map(post =>
    {
      let wrap;
      let donebutton;
      if (post.attributes.done) {
      wrap = <p><del>{post.attributes.title}</del></p>
      donebutton=<button onClick={()=> navigate('/undo/'+post.id)}>
    	Undo
  	</button>
    } else {
      wrap = <p>{post.attributes.title}</p>
      donebutton=<button onClick={()=> navigate('/done/'+post.id)}>
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
  }
  );}
  
  
  return (<div>
   	<h2>To-Do List</h2>
     <form>
     <select id="filterval">
        <option defaultValue="All" onChange={displayposts("All")}>All</option>
        {options}
      </select>
      <button onClick={displayposts()}>Search</button>
      </form>
  	
   
    <button onClick={() => navigate('/add')}>
  	Add
  	</button>
  	</div>
  ); 
}

export default PostList;