//!(after step-1) It's Dynamic Page and Dynamic Route (SSR)

import { db } from "@/config/db.jsx";

//^step-1 here use route segment config for forcefully make this page or route dynamic
export const dynamic = `force-dynamic`; //@ Now this page is dynamic , rendering dynamic page

const DynamicPage = async () => {
  const [doctors] = await db.execute("SELECT * FROM doctors"); // destructure data get in array form when use mySql/promise data get

  //   when hit url http://localhost:3000/rendering/dynamic  data show in Ui
  console.log("dynamic page");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-amber-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        FullStack Framework (No need to use Express/Node.js in Next.js)
      </h1>
      <p className="mb-6 text-gray-600">
        Database data shown in frontend directly from a Server Component.
      </p>

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
