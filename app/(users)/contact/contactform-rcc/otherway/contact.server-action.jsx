//@ step-1
"use server"; // it help to make function inside all code  Server Action

//@ step-4
import { db } from "@/config/db";
// import { redirect } from "next/navigation";

//@ step-2  it is async function b/c use of "use server" (also Server Action) -
//^ here we get directly get form data from contact page and pass into database
export const contactServerActionFun = async (name, email, message) => {
  try {
    //@ step-3 now formData insert into mySQL database (contact_form) using Prepared statement (very useful against SQL injections)
    await db.execute(
      `insert into contact_form (name, email, message) values ( ? , ? , ? )`,
      [name, email, message]
    );
    return { success: true, message: "Form submitted successfully" }; // object return pass response
    // redirect("/");
  } catch (error) {
    console.log("server action:", error);
    return { success: false, message: "Error while submitting" };
  }
};
