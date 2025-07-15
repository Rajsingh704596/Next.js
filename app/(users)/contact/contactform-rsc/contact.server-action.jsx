//@ step-1
"use server"; // it help to make function inside all code  Server Action

//@ step-4
import { db } from "@/config/db";
import { redirect } from "next/navigation";

//@ step-2
//^  contactServerAction is not Component , it is async function (also Server Action) -
// here we get form data from contact page and pass into database
export const contactServerAction = async (formData) => {
  console.log("Form Data Name input :", formData.get("name")); // In Terminal o/p - Form Data Name input : Rock

  //^ 1st way to get all form data
  //   const Name = formData.get("name");
  //   const Email = formData.get("email");
  //   const Message = formData.get("message");
  //   console.log(Name, Email, Message);

  //^ 2 way (better way)- formData.entries() we get nested array [[name:"Rock"],..] ,for handle this we use Object.fromEntries method to wrap them and convert into plain javascript object  + redirect () next/navigation method
  // const { name, email, message } = Object.fromEntries(formData.entries()); //@ Note- destructure input name which define as attribute
  // console.log(name, email, message); // In Terminal all contact formData show

  // //@ step-4 now formData insert into mySQL database (contact_form) using Prepared statement (very useful against SQL injections)
  // await db.execute(
  //   `insert into contact_form (name, email, message) values ( ? , ? , ? )`,
  //   [name, email, message]
  // );
  // redirect("/"); // after submit redirect to home page

  //^ 3 way (better way)- formData.entries() we get nested array [[name:"Rock"],..] ,for handle this we use Object.fromEntries method to wrap them and convert into plain javascript object  + redirect() next/navigation method

  try {
    const { name, email, message } = Object.fromEntries(formData.entries()); //@ Note- destructure input name which define as attribute
    console.log(name, email, message); // In Terminal all contact formData show

    //@ step-4 now formData insert into mySQL database (contact_form) using Prepared statement (very useful against SQL injections)
    await db.execute(
      `insert into contact_form (name, email, message) values ( ? , ? , ? )`,
      [name, email, message]
    );

    //^ a> way to return mess.
    // return { success: true, message: "Form submitted successfully" }; // object return pass into state property in useActionState() hook

    //^ b> way to redirect home page route (but always use outside try catch here situation is diff. so used inside)
    redirect("/");
  } catch (error) {
    //^ we know redirect fun not should be used inside tryCatch , b/c it's throw error but we can handle this by this code  rethrow the redirect error
    if (error.message === "NEXT_REDIRECT") throw error;
    // if (error.message.startsWith("NEXT_REDIRECT")) throw error;   //@ or the other way to handle error when redirect()fun. use inside try catch

    console.log("server action:", error);
    return { success: false, message: "Error while submitting" };
  }
};
