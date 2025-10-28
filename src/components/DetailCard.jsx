// src/components/DetailCard.jsx
import React from 'react';

const DetailCard = ({ url, toggleFavorite, isFavorite }) => {
  return (
    <div className="detail-card">
      <img src={url} alt="Animal" className="animal-image" />
      <button 
        onClick={() => toggleFavorite(url)}
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      >
        {isFavorite ? '⭐️ Favorit Tersimpan' : 'Tambahkan Favorit'}
      </button>
    </div>
  );
};

export default DetailCard;