//! useActionState(use for get loading state , after form submit return message get) + server action(form data pass to database) for perform (Contact Form in Client Component)

"use client"; // Now it's Client Component
import { useActionState } from "react";
import { serverActionFun } from "./contact.server-action";

//^@ step-2 here Form Action define {React 19 feature}
// const contactFormAction = (formData) => {
//   const { name, email, message } = Object.fromEntries(formData.entries()); // destructure all name attribute value in form
//   console.log(name, email, message);
// };

const ContactPage = () => {
  const [state, formAction, isPending] = useActionState(serverActionFun, null); //^ useActionState  hook

  //* when form submit formAction trigger then component call ServerActionFun and pass state(formData)
  //  when data not submit isPending value is true , after submitted it's value automatic false , so it's help to show ui loading in contact form

  return (
    <>
      {/* In client component meta data use like this */}
      <title>Contact Page</title>
      <meta
        name="description"
        content="contact page handle using Form Action in Client Component in Next.js"
      />
      <meta name="authors" content="rock" />
      <meta name="keywords" content="Nextjs , Form Action" />

      <section className="max-w-4xl mx-auto bg-gray-700 text-white px-4 py-8 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-rose-200 mb-4">
          Contact page (Using App router contact path create where contact page
          show)
        </h1>
        <h2 className="text-base text-center text-rose-100 mb-8">
          In Client Component: contact data pass in form Action and send to
          server action where server action send data into data base
        </h2>

        {/* //@step-1  here we pass form data in formAction using action attribute */}
        <form action={formAction}>
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

            {/* 1st way to submit */}

            {/* <button
              type="submit"
              disabled={isPending}
              className="self-start bg-blue-600 text-white hover:bg-blue-500 rounded-md px-6 py-2 font-semibold transition duration-200"
            >
              <span>{isPending ? "Loading..." : "Send Message"}</span>
            </button> */}

            {/* 2nd way to submit form but here no need to pass props (like isPending state) */}
            <Submit />
          </div>
        </form>

        <div>
          {state && (
            <p
              className={`p-4 mt-5 text-center ${
                state.success ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactPage;

//! 2nd way submit component- (where no need pass props) :-  here we use useFormState() hook

import { useFormStatus } from "react-dom"; //React 19 new react-dom hook
const Submit = () => {
  const { pending, data, method, action } = useFormStatus(); // we can destructure pending state and other detail like this (byDefault ).

  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start bg-blue-600 text-white hover:bg-blue-500 rounded-md px-6 py-2 font-semibold transition duration-200"
    >
      <span>{pending ? "Loading..." : "Send Message"}</span>
    </button>
  );
};
