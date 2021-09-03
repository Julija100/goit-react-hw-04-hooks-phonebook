import React, { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList/ContactsList";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";

function App () {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }, [contacts]);
  
  const addContact = (name, number) => {
    const contactsItem = {
      id: uuidv4(),
      name,
      number,
    };

    const dublicateContactName = contacts.find(
      (contact) => contact.name === contactsItem.name
    );
    const dublicateContactNumber = contacts.find(
      (contact) => contact.number === contactsItem.number
    );
    if (dublicateContactName) {
      alert(`${contactsItem.name} is already in contacts.`);
      return;
    }
    if (dublicateContactNumber) {
      alert(`${contactsItem.number} is already in contacts.`);
      return;
    }

    setContacts((contacts) => [contactsItem, ...contacts]);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value );
  };

  const getFilteredContacts = () => {
    const normalFilterValue = filter.toLocaleLowerCase().trim();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalFilterValue)
    );
  };


  const deleteContact = (contactId) => {
    setContacts((contacts) =>
      contacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();
    
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={addContact} />
        <h2>Contacts</h2>
        <Filter onFilterChange={onFilterChange} />
        <ContactsList contacts={filteredContacts}
          deleteContactsButton={ deleteContact}/>
      </div>
    );
  }

export default App;
