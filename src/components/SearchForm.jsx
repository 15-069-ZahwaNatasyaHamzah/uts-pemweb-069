// src/components/SearchForm.jsx
import React from 'react';

const SearchForm = ({ animalType, breeds, setSelectedBreed, currentBreed }) => {
  
  const headerText = animalType === 'dog' ? "Pilih Breed Anjing:" : "Pilih Breed Kucing:";

  const handleChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const getBreedValue = (breed) => {
    return animalType === 'dog' ? breed : breed.id;
  }
  const getBreedName = (breed) => {
    return animalType === 'dog' ? (breed.charAt(0).toUpperCase() + breed.slice(1)) : breed.name;
  }

  return (
    <div className="search-form">
      <h3>{headerText}</h3>
      <select onChange={handleChange} value={currentBreed || ''}>
        <option value="">-- Pilih Breed --</option>
        
        {breeds.map((breed) => (
            <option key={getBreedValue(breed)} value={getBreedValue(breed)}>
              {getBreedName(breed)}
            </option>
        ))}
      </select>
    </div>
  );
};

export default SearchForm;