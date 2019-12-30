import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { array } from "prop-types";



function PostList() {
    const [posts, setPosts] = useState([]);
    let [wuru, setWuru] = useState([]);
    
    
    useEffect(() => {
      const requestPosts = async () => {
        const response = await fetch("/api/posts");
        const { data } = await response.json();
        setPosts(data);
        displayposts("All");
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
    <option value={cat}>{cat}</option>
    )
  }
  );
  console.log(options)
  
  function filteredposts(cat){
    console.log(posts + "Lsd")
    if(cat=="All"){
      return(
        posts
      )

    }else{
    return(
      posts.filter(post=>post.attributes.body==cat)
      
      )
    }}
      
  
  function displayposts(cat) {
        let quvu = cat == 'All' ? cat : cat.target.value
        console.log(quvu)

        let abrakadabra = filteredposts(quvu).map(post => {

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
  })

  setWuru(abrakadabra);
};



console.log(wuru)
  return (
    
  <div>
   	<h2>To-Do List</h2>
     <select onChange={displayposts} id="filterval">
        <option value="All">All</option>
        {options}
      </select>
    
    <button onClick={() => navigate('/add')}>
  	Add
  	</button>
    {wuru}
  	</div>
  );
}

export default PostList;