import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

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

  const postss = posts.map(post => <div>{post.attributes.title}
  	<button onClick={()=> navigate('/edit/'+post.id)}>
  	Edit
  	</button>
  	</div>
  	);

  return (<div>
   	<h2>To-Do List</h2>
  	{postss}
  	<button onClick={() => navigate('/add')}>
  	Add
  	</button>
  	</div>
  ); 
}

export default PostList;