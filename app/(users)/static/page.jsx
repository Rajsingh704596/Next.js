//! It's Static Page(page.jsx), also Static Route (/static) Server component

import { db } from "@/config/db.jsx";

const StaticPage = async () => {
  const [doctors] = await db.execute("SELECT * FROM doctors"); // destructure data get in array form when use mySql/promise data get

  //   when hit url http://localhost:3000/static  data show in Ui

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

export default StaticPage;
