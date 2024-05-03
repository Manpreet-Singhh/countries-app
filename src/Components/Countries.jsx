import React, { useState, useEffect } from 'react';
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="countryDisplay">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
      <div className="countryCards">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="countryCard">
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
