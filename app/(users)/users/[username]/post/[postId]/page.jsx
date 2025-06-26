//? (1st method)
//! Nested Dynamic Route Segment : in React Server component

// const SingleProfilePost = async (props) => {
//   //console.log(props);     // Server   {params: Promise, searchParams: Promise}

//   const user = await props.params; // when we req. url-http://localhost:3000/users/rock/post/101
//   console.log(user); // server object- {username: 'rock', postId: 101}

//   return (
//     <div>
//       <h1>
//         Using Nested Dynamic Route Segment [folder name is username] : we get
//         that dynamic value from route path using props with the help of params
//         inside React server component
//       </h1>
//       <p> Dynamic value of user name: {user.username}</p>
//       <p> Dynamic value of post id : {user.postId}</p>
//     </div>
//   );
// };

// export default SingleProfilePost;

//todo - (2nd Method Best Way)- For Nested Dynamic Route Segment also handle by catch-all segments and optional catch-all segments in client component

//?  (3rd Method - Not Recommended)
//! Dynamic or Nested Dynamic Route Segment : In Client Component   (using React 19 : useApi hook it read promise easily without using async await or .then and .catch)

"use client";

import { use } from "react";

const SingleProfilePost = (props) => {
  // console.log(props);     //   {params: Promise, searchParams: Promise}
  const user = use(props.params); // when we req. url-http://localhost:3000/users/rock/post/101      //^ useApi hook handle promise
  console.log(user); // server object- {username: 'rock', postId: 101}

  return (
    <div>
      <h1>
        Using Nested Dynamic Route Segment [folder name is username] : we get
        that dynamic value from route path using props with the help of params
        and useApi hook inside "Client Component"
      </h1>
      <p> Dynamic value of user name: {user.username}</p>
      <p> Dynamic value of post id : {user.postId}</p>
    </div>
  );
};

export default SingleProfilePost;
