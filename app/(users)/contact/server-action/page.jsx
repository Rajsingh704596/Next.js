//! Server Component Contact page - here we can't use useState(), onChange(), onSubmit() events , we used "Server Action" for submit formdata in Server Component

import { contactServerAction } from "./contact.server-action"; // import serve action function for form submit

//^ metadata obj. create for contact page , next js handle this obj automatically
export const metadata = {
  title: "Contact page", // title show when this page load
  description: "description for contact page",
  authors: [{ name: "Raj Dev" }, { name: "Rock Dev", url: "google.com" }],
  keywords: ["nextjs", "reactjs", "fullstack"],
};

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto bg-gray-700 text-white px-4 py-8 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-center text-rose-200 mb-4">
        Contact page (Using App router contact path create where contact page
        show)
      </h1>
      <h2 className="text-base text-center text-rose-100 mb-8">
        In Sever Component: contact data pass in Sever Action (where form data
        send into database)
      </h2>

      {/* //@step-3  here we pass form data in server Action(contactServerAction) using action attribute */}
      <form action={contactServerAction}>
        <div className="max-w-2xl mx-auto flex flex-col gap-6 border border-sky-600 rounded-lg p-6 bg-gray-800">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-blue-100 text-black  rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-blue-100 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium">
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="bg-blue-100  text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="self-start bg-blue-600 text-white hover:bg-blue-500 rounded-md px-6 py-2 font-semibold transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactPage;
