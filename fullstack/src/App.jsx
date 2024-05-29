import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/contacts";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNameFilter] = useState([]);
  const [succussMessage, setSuccuss] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    contactsService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);
  const handleOnChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleOnChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleOnChangeFilter = (e) => {
    const value = e.target.value;
    console.log(value);
    const ff = persons.filter((person) => {
      console.log(person.name.toLowerCase().startsWith(value.toLowerCase()));
      return person.name.toLowerCase().startsWith(value.toLowerCase());
    });
    console.log(ff);
    setNameFilter(ff);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const Duplicate = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (Duplicate[0] !== undefined) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? contactsService
            .update(newPerson, Duplicate[0].id)
            .then((updated) => {
              const copy = persons.filter(
                (person) => person.name !== updated.name
              );
              setPersons(copy.concat(updated));
            })
            .catch((err) => {
              setErrorMessage(
                `information ${newPerson.name} was already removed from server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            })
        : null;
    } else {
      contactsService.create(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
        setSuccuss(`Added ${newPerson.name}`);
        setTimeout(() => setSuccuss(null), 3000);
      });
    }

    setNewName("");
    setNewNumber("");
  };
  const handleOnClickDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactsService.remove(id);
      setPersons(
        persons.filter((person) => {
          return person.id !== id;
        })
      );
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification succussMsg={succussMessage} errorMsg={errorMessage} />
      <Filter handleOnChangeFilter={handleOnChangeFilter} filter={filter} />
      <h1>add a new</h1>
      <PersonForm
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNumber={handleOnChangeNumber}
        newName={newName}
        newNumber={newNumber}
        handleOnSubmit={handleOnSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleOnClickDelete={handleOnClickDelete} />
    </div>
  );
};

export default App;
