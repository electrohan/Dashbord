import React, { useState, useEffect } from 'react';
import {fetchStation} from "/Dashbord-client/dashbord/src/utils/Station"
import './Bouton.css';

export default function Bouton({ onCityChange }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () =>{
      try{
        const results = await fetchStation()
        const stationNames = results.map(station => station.STATION);
        setCities(stationNames);
        console.log(stationNames);
      }catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
    }
    fetchDataFromApi()
  }, []);

  const handleChange = (event) => {
    onCityChange(event.target.value);
  };

  return (
    <select name='Ville' onChange={handleChange}>
      <option value="">Ville</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
