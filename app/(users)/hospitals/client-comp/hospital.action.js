// ! server action (or server fun. define)

"use server"; // must be define, it help to make function inside all code  Server Action

import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

//^ server action fun. here we get form Data from hospital form and pass into hospital db
export const hospitalServerAction = async (formdata) => {
  try {
    const { name, city, state, department, established_year } = formdata;

    // data insert into hospital_db hospital table
    await db.execute(
      `INSERT INTO hospital (name, city, state, department, established_year) VALUES (?, ?, ?, ?, ?)`,
      [name, city, state, department, established_year]
    );

    revalidatePath("/hospitals/client-comp"); //^ revalidatePath use so hospital/client-comp route page old cache remove and new cache add and automatic data refresh even after build for static page of server component

    return { success: true, message: "Hospital data submitted successfully" }; // after data store in db return response
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.log(error);

    return { success: false, message: "Error while submitting hospital data" };
  }
};
