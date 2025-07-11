//! It's e.g of Dynamic Page Rendering(b/c we use params) + Dynamic Router segment [e.g- id] (In Server Component RSC) -

import { db } from "@/config/db.jsx";
import { notFound } from "next/navigation";

//^ (1 way)  It's Dynamic so when we change dynamic route [id] so every time req. send to database for get data
//* build time in console show this file-  f/doctors/[id]

// const DoctorIdDetail = async (props) => {
//   const params = await props.params; // dynamic value get by params from Url Path (Router path)
//   console.log("params:", params);

//   const [[doctor]] = await db.execute(
//     `SELECT * FROM doctors WHERE doctor_id = ?`,
//     [params.id]
//   ); // destructure data get in array form when use mySql/promise for data get

//   console.log("Single Doctor detail based on his Id", doctor);

//   //* when hit url https://localhost:3000/doctors/1 individual doctor id show

//   //^ here database only 5 id store if we hit url https://localhost:3000/doctor/6, so here next js throw error b/c data not find fetching time but we want to show Error Page that is not-found.jsx, but it's not show byDefault for this case, so we use like this for this edge case[data fetch] -
//   if (!doctor) return notFound(); //@ so notfound fun call and render not-found page

//   // if (!doctor) return <h1>doctor not found</h1>;

//   //^ Helper functions
//   const formatDate = (dateStr) =>
//     new Date(dateStr).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6 text-blue-500">
//         FullStack Framework (No need to use Express/Node.js in Next.js)
//       </h1>
//       <p className="mb-8 text-gray-400 text-lg">
//         Database data shown in frontend directly from a Server Component.
//       </p>

//       <div className="rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden transition hover:shadow-3xl">
//         <div className="p-8 sm:p-10">
//           <div className="flex flex-col sm:flex-row justify-between mb-6">
//             <div>
//               <h2 className="text-3xl font-semibold text-gray-900">
//                 {doctor.name}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Doctor ID:
//                 <span className="font-medium">{doctor.doctor_id}</span>
//               </p>
//               <span
//                 className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
//                 ${
//                   doctor.status === "Active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {doctor.status}
//               </span>
//             </div>
//             <div className="mt-4 sm:mt-0 text-right">
//               <p className="text-lg font-semibold text-blue-700">
//                 {formatCurrency(doctor.consultation_fee)}
//               </p>
//               <p className="text-sm text-gray-500">Consultation Fee</p>
//               <div>
//                 <span className="font-semibold text-gray-900">
//                   Shift: {doctor.shift_time}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
//             <div className="space-y-2">
//               <div>
//                 <span className="font-semibold text-gray-800">Gender:</span>{" "}
//                 {doctor.gender}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">
//                   Date of Birth:
//                 </span>
//                 {formatDate(doctor.date_of_birth)}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">Phone:</span>{" "}
//                 {doctor.phone_number}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">Email:</span>{" "}
//                 {doctor.email}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">Address:</span>{" "}
//                 {doctor.address}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div>
//                 <span className="font-semibold text-gray-800">Specialty:</span>{" "}
//                 {doctor.specialty}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">
//                   Qualifications:
//                 </span>
//                 {doctor.qualifications}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">Experience:</span>{" "}
//                 {doctor.years_of_experience} years
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">Department:</span>{" "}
//                 {doctor.department}
//               </div>
//               <div>
//                 <span className="font-semibold text-gray-800">
//                   Joining Date:
//                 </span>
//                 {formatDate(doctor.joining_date)}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorIdDetail;

//? (2.way) Using generateStaticParams function  - {convert dynamic routes[slug],[id](dynamic render page) to pre-render static page , so In short Dynamic pages ko build time pr static pages m convert karne k liye ye fun use hota hai}
//^ so in build time all doctor detail store in memory based on the id , so every time req. not send to database and get from that memory
//* Build time console show -
// ● /doctors/[id]                          179 B         101 kB
// ├   ├ /doctors/1
// ├   ├ /doctors/2
// ├   ├ /doctors/3
// ├   └ [+2 more paths]             (now this data of all doctors is fixed store in memory and  show in statically after npm run start)

//@ now built time this fun. run first
export async function generateStaticParams() {
  const [doctors] = await db.execute(`select doctor_id from doctors`); // so here we get array where all doctor id store
  return doctors.map((doctor) => ({ id: doctor.doctor_id.toString() })); //toString() change number to string

  // Output- (we get o/p like this)     , so here database data id is number type
  // [
  //  {id:1},{id:2},...
  //  ]

  // built time o/p get, that why we use toString() b/c params give only string type value -'1','2'
  // [
  //  {id:'1'},{id:'2'},...
  //  ]
}

const DoctorIdDetail = async (props) => {
  const params = await props.params; // dynamic value get by params from Url Path (Router path)
  console.log("params:", params); // here e.g when hit url  console o/p-  params: {id:'1'}      , so here id is string type

  //@ then built time for every id this code run , so all doctor data get in built time or store in memory(cache) (Now built time if all doctor data get so when we req. in url that data direct get from memory  instead to send req. to database)
  const [[doctor]] = await db.execute(
    `SELECT * FROM doctors WHERE doctor_id = ?`,
    [params.id]
  ); // destructure data get in array form when use mySql/promise for data get

  console.log("Single Doctor detail based on his Id", doctor);

  //* when hit url https://localhost:3000/doctors/1 individual doctor id show

  //^ here database only 5 id store if we hit url https://localhost:3000/doctor/6, so here next js throw error b/c data not find fetching time but we want to show Error Page that is not-found.jsx, but it's not show byDefault for this case, so we use like this for this edge case[data fetch] -
  if (!doctor) return notFound(); //@ so notfound fun call and render not-found page

  // if (!doctor) return <h1>doctor not found</h1>;

  //^ Helper functions
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">
        FullStack Framework (No need to use Express/Node.js in Next.js)
      </h1>
      <p className="mb-8 text-gray-400 text-lg">
        Database data shown in frontend directly from a Server Component.
      </p>

      <div className="rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden transition hover:shadow-3xl">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                {doctor.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Doctor ID:
                <span className="font-medium">{doctor.doctor_id}</span>
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
                ${
                  doctor.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.status}
              </span>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-lg font-semibold text-blue-700">
                {formatCurrency(doctor.consultation_fee)}
              </p>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <div>
                <span className="font-semibold text-gray-900">
                  Shift: {doctor.shift_time}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-800">Gender:</span>{" "}
                {doctor.gender}
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  Date of Birth:
                </span>
                {formatDate(doctor.date_of_birth)}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Phone:</span>{" "}
                {doctor.phone_number}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {doctor.email}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                {doctor.address}
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-800">Specialty:</span>{" "}
                {doctor.specialty}
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  Qualifications:
                </span>
                {doctor.qualifications}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Experience:</span>{" "}
                {doctor.years_of_experience} years
              </div>
              <div>
                <span className="font-semibold text-gray-800">Department:</span>{" "}
                {doctor.department}
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  Joining Date:
                </span>
                {formatDate(doctor.joining_date)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorIdDetail;
