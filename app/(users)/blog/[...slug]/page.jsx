//! Catch All Segments [...folderName] - handle easily Dynamic Nested routes
//# (url m forward slash jitni bhi value denge use easily catch kar skte hai using Catch All segments)

const Blog = async (props) => {
  const { slug } = await props.params; // here slug destructure , b/c slug is foldername that is define like this [...slug] that is catch-all Segments (dynamic nested routes)

  //   when url is - http://localhost:3000/blog/technology/frontend/javascript
  console.log(slug); // server Array(2) ['technology', 'frontend','javascript']

  return (
    <div>
      <h1>Blog</h1>

      <ul>
        {slug.map((curElem, index) => (
          <li key={index}>{curElem}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
