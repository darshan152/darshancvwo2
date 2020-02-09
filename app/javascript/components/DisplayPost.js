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

    //Initialize Done and Total post counter
    let donecounter = 0;
    let postcounter = 0;
    //Var to store posts in html format, mapping each post to a done,edit and delete button   
    let displayedpost = filteredposts(cat).map(post => {
      let wrap;
      let buttons;
      if (post.attributes.done) {
        donecounter++;
        postcounter++;
        wrap = <div class = "text-muted"><del>{post.attributes.title}</del></div>
        buttons=
        <div>
        <button type = "button" class="btn btn-secondary" onClick={()=> navigate('/undo/'+post.id)}>
          Undo
        </button>
        <button type="button" class="btn btn-danger ml-2" onClick={()=> navigate('/del/'+post.id)}>
          Delete
        </button>
        </div>
      } else {
        postcounter++;
        wrap = <div class = "mb-2 mt-2"><h5><small>{post.attributes.title}</small></h5></div>
        buttons=
        <div>
        <button type="button" class="btn btn-success" onClick={()=> navigate('/done/'+post.id)}>
          Done
        </button>
        <button type="button" class="btn btn-warning ml-2" onClick={()=> navigate('/edit/'+post.id)}>
          Edit
        </button>
        <button type="button" class="btn btn-danger ml-2" onClick={()=> navigate('/del/'+post.id)}>
          Delete
        </button>
        </div>
      }
      return(
        <div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
          <div>{wrap}</div>
          {buttons}
        </div>
      )
    })
  

    //Function to return percentage of to-do list items completed
    function donePercentage(done,total) {
      console.log(done,total);
      let percentage = ((done/total)*100).toFixed(2);
      console.log(percentage);
      if (total==0){
        return (
          <h3 class="mt-4">
            Your To-do list is so empty! You can add items by clicking the 'Add' button
          </h3>
        )
      }
      let motivationalMsg;
      if (percentage<=20) {
        motivationalMsg="Don't give up, Keep going!"
      }else if(percentage<=60) {
        motivationalMsg="Good job, you are almost there!"
      }else if (percentage==100.00) {
        motivationalMsg="Congratulations! You are done!"
      }else if (percentage <100){
        motivationalMsg="Just a bit more, give it your all!"
      }
      
      return (
        <div class="mt-4">
        <div>
          You have completed
        </div>
        <div>
          <h2 class="text-center">
            {percentage}%
          </h2>
        </div>
        <div>
          {motivationalMsg}
        </div>
      </div>
      )
    }
    
  
  
  
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col">
              <h2 class="m-2 text-center">{cat}</h2>
                {displayedpost}
              </div>
            <div class="col">
              {donePercentage(donecounter,postcounter)}
              <button class="btn btn-primary m-2 mt-4" onClick={() => navigate('/add/'+cat)}>
                Add more items
              </button>
              <button class="btn btn-info mt-3" onClick={()=>window.history.back()}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };
export default DisplayPost;