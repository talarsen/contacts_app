import * as React from "react";

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
      <h1 className="mt-5">Contact List</h1>
      <table className="table table-striped mt-5">
        <thead className="table m-auto thead-dark">
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

  const canAdd = contact !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addContact(contact);
      setContact("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input
          onChange={(e) => setContact(e.currentTarget.value)}
          value={contact}
        />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Contacts;
