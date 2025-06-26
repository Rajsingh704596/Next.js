//! Nested Dynamic Route Segment

const SingleProfilePost = async (props) => {
  //console.log(props);     // Server   {params: Promise, searchParams: Promise}

  const user = await props.params; // when we req. url-http://localhost:3000/users/rock/post/101
  console.log(user); // server object- {username: 'rock', postId: 101}

  return (
    <div>
      <h1>
        Using Nested Dynamic Route Segment [folder name is username] : we get
        that dynamic value from route path using props with the help of params
        inside server component
      </h1>
      <p> Dynamic value of user name: {user.username}</p>
      <p> Dynamic value of post id : {user.postId}</p>
    </div>
  );
};

export default SingleProfilePost;
