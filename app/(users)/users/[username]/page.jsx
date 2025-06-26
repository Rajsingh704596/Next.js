const SingleProfile = async (props) => {
  //console.log(props);     // Server   {params: Promise, searchParams: Promise}

  const user = await props.params; // when we req. url-http://localhost:3000/users/rock
  console.log(user); // server object- {username: 'rock'}

  return (
    <div>
      <h1>
        Using Dynamic Route Segment [folder name is username] : we get that
        dynamic value from route path using props with the help of params inside
        server component
      </h1>
      <p> Dynamic value is : {user.username}</p>
    </div>
  );
};

export default SingleProfile;
