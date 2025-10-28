// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
// Import dari Barrel File untuk mengatasi bug path/caching
import { 
    Header, 
    SearchForm, 
    GalleryGrid, 
    DataTable, 
    DetailCard 
} from './components/index.js'; 


// --- DATA HARDCODED UNTUK BREED ---
const DOG_BREEDS = ['husky', 'pitbull', 'bulldog']; 
const CAT_BREEDS = [
    { name: 'Bengal', id: 'beng' },
    { name: 'Ragdoll', id: 'ragd' },
    { name: 'Siamese', id: 'siam' }
];
const DEFAULT_DOG_BREED = DOG_BREEDS[0];
const DEFAULT_CAT_BREED_ID = CAT_BREEDS[0].id;

// Custom Hook untuk localStorage (Wajib 5)
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.error("Error reading localStorage", error);
        return defaultValue;
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
};

function App() {
  const [animalType, setAnimalType] = useState('dog');
  const [selectedBreed, setSelectedBreed] = useState(DEFAULT_DOG_BREED); 
  const [images, setImages] = useState([]);
  const [fact, setFact] = useState('');
  const [favoriteUrls, setFavoriteUrls] = useLocalStorage('favoriteImages', []);
  const [loading, setLoading] = useState(false);

  const getCurrentBreedId = useCallback(() => {
    if (animalType === 'dog') {
      return selectedBreed || DEFAULT_DOG_BREED;
    } else {
      return selectedBreed || DEFAULT_CAT_BREED_ID;
    }
  }, [animalType, selectedBreed]);


  // Ambil Gambar (Wajib 3)
  const fetchImages = useCallback(async () => {
    setLoading(true);
    let url = '';
    const breedId = getCurrentBreedId();
    
    if (!breedId) {
        setImages([]);
        setLoading(false);
        return;
    }
    
    if (animalType === 'dog') {
      url = `https://dog.ceo/api/breed/${breedId}/images/random/10`;
    } else if (animalType === 'cat') {
      url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`; 
    } else {
      setImages([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (animalType === 'dog') {
         setImages(Array.isArray(data.message) ? data.message : []); 
      } else {
         setImages(Array.isArray(data) ? data.map(img => img.url) : []);
      }
    } catch (error) {
      console.error(`Error fetching ${animalType} images:`, error);
      setImages([]);
    } finally {
        setLoading(false);
    }
  }, [animalType, getCurrentBreedId]);


  // Ambil Fakta (Wajib 4)
  const fetchFact = useCallback(async () => {
    const url = 'https://catfact.ninja/fact'; 
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFact(`Fakta ${animalType.toUpperCase()}: ${data.fact}`); 
    } catch (error) {
      console.error("Error fetching fact:", error);
      setFact("Gagal mengambil fakta hewan.");
    }
  }, [animalType]); 

  // Toggle Favorit (Wajib 5)
  const toggleFavorite = (url) => {
    setFavoriteUrls(prevUrls => {
        if (prevUrls.includes(url)) {
            return prevUrls.filter(u => u !== url); 
        } else {
            return [...prevUrls, url]; 
        }
    });
  };

  // --- SIDE EFFECTS (Perbaikan Transisi) ---
  
  // Efek 1: Mengatur default breed dan memanggil fetchFact saat animalType berubah
  useEffect(() => {
    if (animalType === 'dog') {
      setSelectedBreed(DEFAULT_DOG_BREED);
    } else {
      setSelectedBreed(DEFAULT_CAT_BREED_ID);
    }
    
    fetchFact();
  }, [animalType, fetchFact]);

  // Efek 2: Memanggil fetchImages saat selectedBreed atau animalType berubah
  useEffect(() => {
      if (selectedBreed) {
          fetchImages();
      }
  }, [selectedBreed, animalType, fetchImages]);


  return (
    <div className="App">
      {/* Wajib 1: Navigasi */}
      <Header animalType={animalType} setAnimalType={setAnimalType} />
      
      <main className="container">
        {/* Wajib 2: Search Form */}
        <SearchForm 
          animalType={animalType}
          breeds={animalType === 'dog' ? DOG_BREEDS : CAT_BREEDS} 
          setSelectedBreed={setSelectedBreed} 
          currentBreed={selectedBreed} 
        />
        
        {/* Wajib 3: Gallery Grid */}
        <GalleryGrid 
          images={images} 
          toggleFavorite={toggleFavorite} 
          favoriteUrls={favoriteUrls} 
          loading={loading}
        />

        <hr />

        {/* Wajib 4: Tabel Animal Facts dengan Refresh */}
        <DataTable fact={fact} refreshFact={fetchFact} />

        <hr />
        
        {/* Tampilan List Favorit */}
        <h3>⭐️ Favorite Images List ({favoriteUrls.length})</h3>
        <div className="favorite-list">
          {favoriteUrls.map((url, index) => (
            <DetailCard 
                key={'fav' + url + index} 
                url={url} 
                toggleFavorite={toggleFavorite} 
                isFavorite={true} 
            />
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;