import express from "express";

import * as db from "./db.mjs";
//declare router name and set it equal to the Router() module
const contactRouter = express.Router();
/***Set Up Routes */
//get ALL contacts
contactRouter.get("/", async (req, res) => {
  try {
    const allContacts = await db.getContacts();
    res.json(allContacts);
  } catch (err) {
    console.lor(err.message);
  }
});

//get A contact
//not much different from get all but speicify params in route.
contactRouter.get("/", async (req, res) => {
  try {
    const contact = await db.getOneContact();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
  }
});

//add a contact
contactRouter.use(express.json());
contactRouter.post("/", async (request, response) => {
  //possible change request.body.name to just request.body
  console.log(request.body);
  const contact = await db.addContact(request.body);
  response.status(201).json(contact);
});

//edit a contact
contactRouter.put("/", async (request, response) => {
  console.log(request.body);
  const contact = await db.editContact(request.body);
  response.status(201).json(contact);
});

export default contactRouter;
