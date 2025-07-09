//!(after step-1) It's Dynamic Page and Dynamic Route (SSR) [After build every time send req. when user go this page]
//!(after step-2) cache() method wrap the function component and memoize it in first call (store return data in cache) , or same fun. call again it's prevent to re-render , and give data from cache

import { db } from "@/config/db.jsx";
import { cache } from "react";

//^ step-1 here use route segment config for forcefully make this page or route dynamic
export const dynamic = `force-dynamic`; //@ Now this page is dynamic , rendering dynamic page/SSR

//^ step-2 function component(where db data get) wrap with cache() method
//? here React cache() fetches data on first call and reuses it from memory for the same arguments on subsequent server calls.
const getAllDoctorFromDB = cache(async () => {
  const [doctors] = await db.execute("SELECT * FROM doctors"); // destructure data get in array form when use mySql/promise data get

  //   when hit url http://localhost:3000/rendering/dynamic  data show in Ui
  console.log(
    "fetching doctors data from db, when this fun call 2 time in code, this log run/show only 1 time , 2 time data will get from cache"
  );

  return doctors; // all db doctor data return
});

//^ Normal React Server Component , and after step -1 it's become dynamic page(SSR)
const DynamicPage = async () => {
  const doctors = await getAllDoctorFromDB(); //^ fun. call 1 time  and store data in cache
  console.log("using step-1 : this page become dynamic page/SSR");
  return (
    <div className="p-6 max-w-4xl mx-auto bg-amber-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        FullStack Framework (No need to use Express/Node.js in Next.js)
      </h1>
      <p className="mb-6 text-gray-600">
        Database data shown in frontend directly from a Server Component.
      </p>

      <h2 className="mb-6 text-gray-700">
        👉Step -1 Time : It's dynamic page where data is up to date (after build
        every time send req. for db , when hit this page(dynamic rendering page
        in Server component)) , SSR+cache()
      </h2>
      {/* Part -1 Normal way [SSR+cache data use] */}
      <ul className="space-y-4">
        {doctors?.map((doc) => (
          <li
            key={doc.doctor_id}
            className="border border-gray-200 bg-rose-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
            <p className="text-sm text-gray-600">Specialty: {doc.specialty}</p>
            <p className="text-sm text-gray-600">
              Department: {doc.department}
            </p>
            <p className="text-sm text-gray-600">
              Experience: {doc.years_of_experience} years
            </p>
            <p className="text-sm text-gray-600">Shift: {doc.shift_time}</p>
            <p className="text-sm text-gray-600">Status: {doc.status}</p>
          </li>
        ))}
      </ul>

      <br />
      {/* Part 2 -cache fun 2 time use(call) in react server component , [RSC + cache data use]*/}
      <DoctorLists />
    </div>
  );
};

export default DynamicPage;

//! Note- In Next js not matter data will get from database and show in UI , it still count as static page [Static Page]
//todo - when we use "npm run build" for making production ready code - so this file show like this in console server terminal-
//1.  o /rendering/dynamic            (Now build time in console file look like this ,so here o represent it's a static page rendering)
//2.  also console part show - dynamic page      (means build time static page content also run)
//# now build file run by "npm run start" - so data which get from first time in UI is static content show (which is fixed always even if database data change data not update)

//todo - after step-1 this page is change static to dynamic , then again "npm run build"  [Dynamic Page]
//1.  console not show any Dynamic page Content
//2.  f /rendering/dynamic            (Now build time in console file look like this , here f represent it's dynamic page )
//# now after step-1 build file create then it's run by "npm run start" then data show in UI + also dynamic content run in console at that time
//3.   console now this part show - dynamic page  (means after build dynamic page run)

//*4.  Dynamic Page Rendering - (even after build file) when in data base data will change /update/ delete that reflect also show in UI , means data change automatically after build in UI based on database changes.

//? here 2nd time call cache() method (React 18 feature) in SSR , so cache method prevent to re-render and return value from cache :-
// It's also Server Component -
const DoctorLists = async () => {
  const doctors = await getAllDoctorFromDB(); //^ 2nd fun not call data get from cache
  console.log("React server component (RSC)");

  return (
    <>
      <h2 className="m-6 text-gray-600">
        👉 Step-2 Time : RSC + React 18 feature cache() method : for the first
        time call store the value in cache that help to prevent re-render
        component when argument not change , so here 2nd time call so data get
        from cache
      </h2>
      <ul className="space-y-4">
        {doctors?.map((doc) => (
          <li
            key={doc.doctor_id}
            className="border border-purple-200 bg-indigo-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
            <p className="text-sm text-gray-600">Specialty: {doc.specialty}</p>
            <p className="text-sm text-gray-600">
              Department: {doc.department}
            </p>
            <p className="text-sm text-gray-600">
              Experience: {doc.years_of_experience} years
            </p>
            <p className="text-sm text-gray-600">Shift: {doc.shift_time}</p>
            <p className="text-sm text-gray-600">Status: {doc.status}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
