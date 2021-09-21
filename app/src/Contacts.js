import * as React from "react";

import EditContact from "./EditContact";
import * as apiClient from "./apiClient";

//create component to load ALL contacts
const Contacts = () => {
  //set state for each contact
  const [contacts, setContacts] = React.useState([]);
  //load contacts function that call the getContacts function located in the apiClient folder
  const loadContacts = async () => setContacts(await apiClient.getContacts());
  const addContact = (contact) =>
    apiClient.addContact(contact).then(loadContacts);

  React.useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section>
      <ContactList contacts={contacts} />
      <AddContact {...{ addContact }} />
    </section>
  );
};

const ContactList = ({ contacts }) => {
  return (
    <>
      <h1 className="mt-2">Contact List</h1>
      <table className="table table-striped mt-2">
        <thead className="table thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {/*** contact list will go here */}
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <EditContact />
              </td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const AddContact = ({ addContact }) => {
  const [contact, setContact] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const canAdd = contact !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addContact(contact);
      setContact("");
    }
  };

  return (
    <>
      <h1 className="my-5 ">Add Contact</h1>
      <form className="d-flex">
        <input
          className="form-conrol"
          type="text"
          placeholder="Add Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="email form-conrol"
          type="text"
          placeholder="contact@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="e.g. 555-555-5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          disabled={!canAdd}
          className="btn btn-success"
          onClick={onSubmit}
        >
          Add Contact
        </button>
      </form>
    </>
  );
};

export default Contacts;
