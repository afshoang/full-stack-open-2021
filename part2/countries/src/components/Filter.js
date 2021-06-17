import React from 'react';

const Filter = ({ countries, keyword, handleChange, handleChangeCountry }) => {
  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <>
      find countries <input value={keyword} onChange={handleChange} />
      {filteredCountries.length > 10 && keyword !== '' && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.map((country) => (
          <p key={country.name}>
            {country.name}
            <button onClick={() => handleChangeCountry(country)}>show</button>
          </p>
        ))}
    </>
  );
};

export default Filter;
