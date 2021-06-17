import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/persons');
      setPersons(data);
    };
    fetchData();
  }, []);

  const addPhoneBook = (e) => {
    e.preventDefault();
    const existedPhone = persons.find((person) => person.name === newName);

    if (existedPhone) {
      alert(`${newName} already add to phone book`);
    } else {
      const phoneBookObj = {
        name: newName,
        number: newPhone,
      };
      setPersons([...persons, phoneBookObj]);
    }
    setNewName('');
    setNewPhone('');
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
        <Persons persons={filteredPersons} />
      ) : (
        <Persons persons={persons} />
      )}
    </div>
  );
};

export default App;
