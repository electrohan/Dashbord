import React from 'react';
import './Bouton.css';

const cities = [
  "Ville", "Biankouma", "Bocanda", "Bouaflé", "Bouaké Aéro", "Daloa", "Dianra", "Dikodougou",
  "Dimbokro", "Dioulatiédougou", "Duékoué", "Ferké", "Guiglo", "Korhogo Aéro", "Man",
  "Mankono", "M’Bahiakro", "Niakara", "Ouéllé", "Sassandra", "Séguéla", "Soubré",
  "Tiassalé", "Tiébissou", "Touba", "Toumodi", "Vavoua"
];

export default function Bouton({ onCityChange }) {
  const handleChange = (event) => {
    onCityChange(event.target.value);
  };

  return (
    <select name='Ville' onChange={handleChange}>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
