"use client"; // now this component is client component

import { useState, useEffect } from "react";
import { Counter } from "./Counter";

const ClientComp = () => {
  const [jsonData, setJsonData] = useState();
  const URL = "https://jsonplaceholder.typicode.com/posts"; //^ But API keys expose in Client side in Network tab

  useEffect(() => {
    const fetchJsonData = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      console.log(data);
      if (data) {
        setJsonData(data);
      }
    };

    fetchJsonData();
  }, []);

  return (
    <div>
      React Client Component (RCC)
      <ol type="1">
        <li>
          we can't use onClick event handle in server component
          <button
            onClick={() => alert("hi")}
            className="bg-amber-700 px-2 py-1 cursor-pointer rounded-full"
          >
            Click
          </button>
        </li>

        <li>
          <p>Fetch Json Data - Inside Client component </p>
          <p>
            Drawback: Api key expose in Network tab easily as "; post" name
            after click we can check all the data in "Response" part and
            "Headers" part Requested URL(api) show easily
            <br />
            Event If we use .env file for url , it's show in client side
          </p>
          <ul className="grid grid-cols-3 gap-5">
            {jsonData?.map((curData, index) => (
              <li key={index}>{curData.body}</li>
            ))}
          </ul>
        </li>

        <li>
          <p>Inside client component all component is client component</p>
          {/* todo- If a Client Component imports another Component,that imported one becomes a client component too , even if it doesn't have "use client" */}
          <Counter />
        </li>
      </ol>
    </div>
  );
};

export default ClientComp;

//! React Client Component (RCC) - (needs 'use client' at top)
//# Must start with 'use client' at the top of the file.
//# All components inside a Client Component will also be treated as client components.
//# Cannot be an async function/component. (client component ko kbhi bhi async function/component nhi bana skte hai , uske inside useEffect m async fun. create kar skte hai data fetching k liye)
//# Can use React hooks like useState, useEffect, useRef, etc.
//# Needed for interactivity (buttons, forms, animations).
//# Can access browser APIs like window, document, localStorage.
//# Rendered and hydrated on both server (for initial HTML) and client (for interactivity).{ Client Component will be render twice , in server and in client/browser as well as like react component}
//# Typically heavier in bundle size than server components.

//# Data/API keys are visible in the browser (use only public key)
