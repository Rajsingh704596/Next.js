//! Static page (static route) + Dynamic functionality add (after build render updated data) => ISR (Incremental Static Regeneration)-

import { db } from "@/config/db.jsx";

export const revalidate = 60; //^ Note - Must use this line to make static page to ISR   [revalidation time = 60 second]

const IncrementalStaticRegeneration = async () => {
  const [doctors] = await db.execute("SELECT * FROM doctors"); // destructure data get in array form when use mySql/promise data get

  //   when hit url http://localhost:3000/rendering/ISR  data show in Ui

  console.log("Incremental Static Regeneration static page", doctors);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-amber-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        FullStack Framework (No need to use Express/Node.js in Next.js)
      </h1>
      <p className="mb-6 text-gray-600">
        Database data shown in frontend directly from a Server Component.
      </p>
      <h2 className="mb-6 text-gray-600">
        It's static page with dynamic functionality (ISR) where after build
        automatic, In background next js update/regenerate Static Pages without
        Rebuild after revalidation period and show that data when reload this
        page/ to New Visitor
      </h2>

      <ul className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {doctors?.map((doc) => (
          <li
            key={doc.doctor_id}
            className=" max-w-xs h-full border border-gray-200 bg-rose-100 rounded-xl p-4 shadow-sm hover:shadow-md transition "
          >
            <span className="text-gray-950">{doc.doctor_id}</span>
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

export default IncrementalStaticRegeneration;

//! ISR - (work like this after build)
//^ Let's say our page was built at 12:00 PM with 10 database entries:

//* TimeLine -
// 12:00 PM : (npm run build) Build complete, page has 10 entries.
// 12:30 PM : We delete 2 entries (Now 8 entries in DB (any database))
// 1:00 PM : User visits page (60+ seconds after build)

//* What the user sees:
// Immediately : The cached version with 10 entries (stale data) show for the first time
// Background (after 60 sec.) : Next.js triggers regeneration with current DB state (8 entries)
// Reload same page/Next visitor : Gets the fresh version with 8 entries , and 60 second that data is fresh consider, after 60 sec that become stale , so again regenerate in background by next js when new req come , and for the first time stale data show after reload or refresh get fresh data also now new visitor also get fresh data.

//Todo- ISR in Next js - Page after build statically generate hota ha , or har "n" seconds k baad stale (data old) ho jata hai or background m re-generate (update) hota hai jb new request aati hai (chahe data base m khuch change hua ho ya nhi hua ho) , taki naye data k sath updated version mile new User / same request karne wale ko phle stale data dikhta hai phir page reload pr refresh data

//$ Key Points-
//# No automatic background updates- ISR only regenerates when someone requests tha page after the revalidate period
//# Stale data is served first - Users never wait for regeneration
//# Zero downtime - Page is always available, even during regeneration failures.
