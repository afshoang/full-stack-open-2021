import React, { useState, useEffect } from 'react';
import personServices from './services/persons';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [keyword, setKeyword] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

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
      const mess = window.confirm(
        `${existedPhone.name} already added to phonebook, replace the old number with the new one?`
      );
      if (mess) {
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
            setPersons(persons.filter((p) => p.id !== existedPhone.id));
            showAlert(
              `${existedPhone.name} was already deleted from server`,
              'danger'
            );
          });
      }
    } else {
      // create new person
      personServices
        .createPerson(phoneBookObj)
        .then((returnPersons) => {
          setPersons([...persons, returnPersons]);

          showAlert(`Added ${returnPersons.name}`, 'success');
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(`${error.response.data.error}`, 'danger');
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

      const deletedPersons = persons.filter((p) => p.id !== id);

      // message: success delete
      showAlert(` Deleted ${name}`, 'danger');

      setPersons(deletedPersons);
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

  // filter person by name
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(keyword);
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification alert={alert} />

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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
