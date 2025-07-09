//! It's Static Page(page.jsx) and Static route(App router) Server component

import { db } from "@/config/db.jsx";

const StaticPage = async () => {
  const [doctors] = await db.execute("SELECT * FROM doctors"); // destructure data get in array form when use mySql/promise data get

  //   when hit url http://localhost:3000/rendering/static  data show in Ui

  console.log("static page");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-amber-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        FullStack Framework (No need to use Express/Node.js in Next.js)
      </h1>
      <p className="mb-6 text-gray-600">
        Database data shown in frontend directly from a Server Component.
      </p>
      <h2>
        It's Static Page Rendering by default every server component ,after
        build always fixed even after database is change here not reflect
      </h2>

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

export default StaticPage;

//! Note- In Next js not matter data will get from database and show in UI , it still count as static page
//todo - when we use "npm run build" for making production ready code - so this file show like this in console server terminal-
//1. o /rendering/static            (Now build time in console file look like this , so here o represent it's a static page rendering)

//2. also console part show - "static page"  ( means build time static page content also run)

//# now build file run by "npm run start" - so data which get from first time in UI is static content show (which is fixed) after refresh of this page shows always b/c data only get one time and store in cached. (even after in database data change here nothing change)

//*4. Static Page Rendering - (after build file) when in data base data will change /update/ delete that not reflect in UI , means data not change only after build which data render first time that is fixed , and always show because it's static page .
