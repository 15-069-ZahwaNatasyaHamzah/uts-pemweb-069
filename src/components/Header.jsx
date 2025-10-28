// src/components/Header.jsx
import React from 'react';

const Header = ({ animalType, setAnimalType }) => {
  return (
    <header>
      <h1>Animal Facts and Images</h1> 
      <nav>
        <button 
          onClick={() => setAnimalType('dog')} 
          disabled={animalType === 'dog'}
        >
          🐶 Dog
        </button>
        <button 
          onClick={() => setAnimalType('cat')} 
          disabled={animalType === 'cat'}
        >
          🐱 Cat
        </button>
      </nav>
    </header>
  );
};

export default Header;