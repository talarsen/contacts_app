import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();
//function to query all contacts from contacts table
//db.any executes a query that can return any number of rows.When 1 or more rows are returned, it resolves with the array of rows.
export const getContacts = () => db.any("SELECT * FROM contacts");

//function to ADD/CREATE a contact
export const addContact = (name, email, phone, notes) =>
  db.one(
    "INSERT INTO contacts(name, email, phone, notes) VALUES(${name} ${email} ${phone} ${notes}) RETURNING *",
    { name, email, phone, notes },
  );

//get ONE contact
//not much different from get all but speicify params in route.
export const getOneContact = () =>
  db.any("SELECT * FROM contacts WHERE name = ${name}");

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
