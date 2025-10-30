// src/components/GalleryGrid.jsx
import React from 'react';
import { DetailCard } from './index.js'; // Import dari barrel file

const GalleryGrid = ({ images, toggleFavorite, favoriteUrls, loading }) => {
  
  if (loading) {
      return <p>Memuat gambar...</p>;
  }

  if (!Array.isArray(images) || images.length === 0) { 
    return (
        <p>
            Tidak ada gambar ditemukan untuk breed ini. 
            Silakan pilih breed lain atau periksa koneksi internet Anda.
        </p>
    );
  }

  return (
    <div className="gallery-grid">
      {images.map((url, index) => ( 
        <DetailCard 
          key={url + index} 
          url={url} 
          toggleFavorite={toggleFavorite}
          isFavorite={favoriteUrls.includes(url)}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;