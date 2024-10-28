import React, { useState } from 'react';

function LocationInput({ onLocationChange }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationChange(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default LocationInput;
