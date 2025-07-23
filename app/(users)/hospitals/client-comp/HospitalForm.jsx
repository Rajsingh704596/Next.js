"use client"; // Now it's client component

import { useRouter } from "next/navigation";
import { hospitalServerAction } from "./hospital.action";

export const HospitalForm = () => {
  const router = useRouter();

  //   form action fun. where form data get
  const handleCreateHospital = async (formData) => {
    const data = Object.fromEntries(formData);
    await hospitalServerAction(data); // server action call and pass the data

    //^ after form submission we want to refresh the page in client component , so we use useRouter() hook where we get properties router.refresh() method
    router.refresh(); //@ now after form submit page will refresh (server component re-run, or if new data get from db and used in any component for show in ui , then wo part bhi update kar deta hai)
    //todo- router.refresh() ka kaam tha server component ko dobara run karwana taaki updated DB data turant UI me dikh sake — bina manually page reload kiye.
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🏥 Add New Hospital
        </h2>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-black shadow p-6 rounded-xl "
          action={handleCreateHospital} // when form submit form action(fun.) call where data pass by action attribute
        >
          <input
            className="border p-2 rounded"
            type="text"
            name="name"
            placeholder="Hospital Name"
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="city"
            placeholder="City"
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="state"
            placeholder="State"
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="department"
            placeholder="Department"
          />
          <input
            className="border p-2 rounded"
            type="number"
            name="established_year"
            placeholder="Established Year (e.g. 2005)"
            min="1800"
            max={new Date().getFullYear()}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add Hospital
          </button>
        </form>
      </div>
    </>
  );
};
