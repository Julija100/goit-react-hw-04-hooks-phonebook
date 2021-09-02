import React, { Component } from "react";
import ContactsList from "./components/ContactsList/ContactsList";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const addedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (addedContacts) {
      this.setState({ contacts: addedContacts });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (this.state.contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }
  // static propTypes = {};

  addContact = (name, number) => {
    const contactsItem = {
      id: uuidv4(),
      name,
      number,
    };

    const { contacts } = this.state;

    const repeatedName = contacts.find(
      (contact) => contact.name === contactsItem.name
    );
    const repeatedNumber = contacts.find(
      (contact) => contact.number === contactsItem.number
    );
    if (repeatedName) {
      alert(`${contactsItem.name} is already in contacts.`);
      return;
    }
    if (repeatedNumber) {
      alert(`${contactsItem.number} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contactsItem, ...contacts],
    }));
  };

  onFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalFilterValue = filter.toLocaleLowerCase().trim();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalFilterValue)
    );
  };


  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  }
    
  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={this.addContact} />
        <h2>Contacts</h2>
        <Filter onFilterChange={this.onFilterChange} />
        <ContactsList contacts={filteredContacts}
          deleteContactsButton={ this.deleteContact}/>
      </div>
    );
  }
}

export default App;
