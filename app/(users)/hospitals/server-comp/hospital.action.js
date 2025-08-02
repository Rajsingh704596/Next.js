// ! server action (or server fun. define)

"use server"; // must be define, it help to make function inside all code  Server Action

import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

//^ server action fun. here we get form Data from hospital form and pass into hospital db
export const createHospitalServerAction = async (formData) => {
  try {
    // Assuming formData is of type FormData
    const data = Object.fromEntries(formData);
    const { name, city, state, department, established_year } = data;

    // data insert into hospital_db hospital table
    await db.execute(
      `INSERT INTO hospital (name, city, state, department, established_year) VALUES (?, ?, ?, ?, ?)`,
      [name, city, state, department, established_year]
    );

    // so when form data submit so on the spot in UI it's also show , so we don't need to refresh the page
    revalidatePath("/hospitals/server-comp"); //^ revalidatePath use so hospital route page old cache remove and new cache add and automatic data refresh

    // return { success: true, message: "Hospital data submitted successfully" };
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.log(error);

    return { success: false, message: "Error while submitting hospital data" };
  }
};
