//! Database config file / utility

import mySql from "mysql2/promise"; // for promise handle we don't need here to use async fun. b/c it's by default wrap with async b/c of mysql2/promise

//@ mySql workbench local connect with 2 method
//  mySql.createConnection()               //^ 1.st way for Single connection create (Development time)

export const db = mySql.createPool({
  //^ 2nd way create pool of reusable connection, not need await (Production Recommended)
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD, // environment variable
  database: "hospital_db", // here insert database after creating in sql workbench
});

// for check connection is done or not
try {
  const connection = await db.getConnection();
  console.log("✅ Database connected successfully");
  connection.release(); // important to release back to pool
} catch (error) {
  console.log("❌ Database connection failed", err);
  process.exit(1); // stop server if DB is essential
}
