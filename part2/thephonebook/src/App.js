import React, { useState, useEffect } from 'react';
import personServices from './services/persons';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Add new phonebook
  const addPhoneBook = (e) => {
    e.preventDefault();
    const existedPhone = persons.find((person) => person.name === newName);

    const phoneBookObj = {
      name: newName,
      number: newPhone,
    };

    // if existed phone book => update number
    if (existedPhone) {
      const msg = window.confirm(
        `${existedPhone.name} already added to phonebook, replace the old number with the new one?`
      );
      if (msg) {
        // update person
        personServices
          .updatePerson(existedPhone.id, phoneBookObj)
          .then((returnPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnPerson.id ? returnPerson : person
              )
            );
          })
          .catch((error) => {
            alert(` '${existedPhone.name}' was already deleted from server`);
            setPersons(persons.filter((p) => p.id !== existedPhone.id));
          });
      }
    } else {
      // create new person
      personServices.createPerson(phoneBookObj).then((returnPersons) => {
        setPersons([...persons, returnPersons]);
      });
    }
    // clear input
    setNewName('');
    setNewPhone('');
  };

  // Delete phonebook
  const handleDelete = ({ name, id }) => {
    const result = window.confirm(`Delete ${name}`);
    if (result) {
      personServices.deletePerson(id);

      const filteredPersons = persons.filter((p) => p.id !== id);
      setPersons(filteredPersons);
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setNewPhone(e.target.value);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.includes(keyword);
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter keyword={keyword} handleChangeKeyword={handleChangeKeyword} />

      <h3>add a new</h3>
      <PersonForm
        addPhoneBook={addPhoneBook}
        newName={newName}
        handleChangeName={handleChangeName}
        newPhone={newPhone}
        handleChangePhone={handleChangePhone}
      />

      <h2>Numbers</h2>
      {filteredPersons.length > 0 ? (
        <Persons persons={filteredPersons} handleDelete={handleDelete} />
      ) : (
        <Persons persons={persons} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
