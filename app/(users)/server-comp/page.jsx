const ServerComponent = async () => {
  //^ here Server Component is by default async component , so we don't need to create async fun , we direct fetch data inside server component , and api not show in Network tab inside chrome dev tool
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(URL);
  const data = await res.json();
  console.log(data);
  return (
    <div>
      React Server Component (RSC)
      <h2>Fetch Data in React Server component</h2>
      <p>
        In Server Component All Data basically render in server then render in
        Client , so Api or other key not show in Network tab
      </p>
      <ul className="grid grid-cols-3 gap-5">
        {data?.map((curData, index) => (
          <li key={index}>{curData.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerComponent;

//! Server Component - (default inside app folder )
//# Server component runs/render only on the server and serve it to the browser/client.
//# Inside a Server Component, we can use both Server and Client components.
//# Can be an async function/component — useful for directly fetching data.
//# Cannot use state, effects, or browser APIs (like window, localStorage).
//# Smaller bundle size – not sent to browser.
//# Ideal for data fetching, rendering static/SSR content.
//# Cannot handle events like onClick, onChange, etc.          ( here event handler not used it's throw error)
//# Better for SEO and performance.

//# Data/Api keys are kept secret on the server(safe for private keys)
