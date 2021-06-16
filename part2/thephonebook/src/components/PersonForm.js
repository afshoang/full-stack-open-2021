import React from 'react';

const PersonForm = ({
  addPhoneBook,
  newName,
  handleChangeName,
  newPhone,
  handleChangePhone,
}) => {
  return (
    <>
      <form onSubmit={addPhoneBook}>
        <div>
          name: <input value={newName} onChange={handleChangeName} required />
        </div>
        <div>
          phone:{' '}
          <input value={newPhone} onChange={handleChangePhone} required />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
