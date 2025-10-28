// src/components/DataTable.jsx
import React from 'react';

const DataTable = ({ fact, refreshFact }) => {
  return (
    <div className="data-table">
      <h3>Animal Fact</h3>
      <p>{fact || "Klik Refresh Fact untuk mendapatkan fakta baru."}</p> 
      <button onClick={refreshFact}>
        🔄 Refresh Fact
      </button>
    </div>
  );
};

export default DataTable;