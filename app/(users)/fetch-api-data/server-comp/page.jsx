//! FetchApi data in React Server Component -  {when hit url http://localhost:3000/fetch-api-data/server-comp?name=rohit}

import { Suspense } from "react";
import DataCard from "./DataCard";

//* Here first we get URL query (?name=...) using searchParams,
//* and pass it into the Genderize API to show name, gender, and probability

const DataFetchServer = async (props) => {
  //   const searchParams = await props.searchParams; // it's return promise
  //   const userName = searchParams?.name;

  const userName = await props.searchParams?.name; // it's return promise

  //^ Handle case where no name is provided
  // !userName will handle: undefined, null, "", false, 0
  // .trim() removes spaces from both sides and checks for empty string
  if (!userName || userName.trim() === "") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Name Provided
          </h1>
          <p className="text-gray-600">
            Please add <code>?name=yourname</code> to the URL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      <div className="h-full flex justify-center items-center">
        <h2>
          Hi I am 1st Component , In loading.jsx i have to wait but in Suspense
          I don't .
          <br />
          If Api get fast so i am show on the spot But DataCard Component not
          show b/c after 3 sec it's show at that time me and fallbackUi show
          together
          <br />I support partial rendering , This means you can show a fallback
          UI ( Like a loading spinner or skeleton) for specific components while
          the rest of your application renders and remain interactive.
        </h2>
      </div>

      {/* 2nd component inside explicitly promise add so take time and that time we show fallback ui (loading... show in piece of part of page) using Suspense component wrap that component and rest part not affect show properly */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            Loading...
            <div className="size-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <DataCard userName={userName} />
      </Suspense>
    </div>
  );
};

export default DataFetchServer;
