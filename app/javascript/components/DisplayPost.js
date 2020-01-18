import React, { Container, Row, Col , useEffect, useState } from "react";
import { navigate } from "@reach/router";

function DisplayPost(props){
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

    //Getting Category
    const cat = props.cat;

    //Function to Filter post according to Category
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
        
    //Var to store posts in html format, mapping each post to a done,edit and delete button   
      let displayedpost = filteredposts(cat).map(post => {
        let wrap;
        let donebutton;
        if (post.attributes.done) {
          wrap = <p><del>{post.attributes.title}</del></p>
          donebutton=
          <button type="button" class="btn btn-secondary" onClick={()=> navigate('/undo/'+post.id)}>
            Undo
          </button>
        } else {
          wrap = <p>{post.attributes.title}</p>
          donebutton=
          <button type="button" class="btn btn-success" onClick={()=> navigate('/done/'+post.id)}>
            Done
          </button>
        }
      
        return(
          <div>
            <div>{wrap}</div>
            {donebutton}
            <button type="button" class="btn btn-warning" onClick={()=> navigate('/edit/'+post.id)}>
              Edit
            </button>
            <button type="button" class="btn btn-danger" onClick={()=> navigate('/del/'+post.id)}>
              Delete
            </button>
          </div>
        )
      })
  
    
    
  
  
  
    return (
      <div>
           <h2>{cat}</h2>
        <br />
        {displayedpost}
        
        <br />
        <button onClick={() => navigate('/add/'+cat)}>
            Add
          </button>
          <button onClick={()=>window.history.back()}>
            Back
        </button>
      </div>
    )
  };
export default DisplayPost;