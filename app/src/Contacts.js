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

const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map(({ id, name, phone, email, notes }) => (
      <li key={id}>{contacts}</li>
    ))}
  </ul>
);

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
