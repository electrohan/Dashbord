import './App.css';
import React, { useState, useEffect } from 'react';
import Logo from './assets/logo.png';
import Bouton from './components/Bouton/Bouton';

function App() {
  const [selectedCity, setSelectedCity] = useState("Ville");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    if (selectedCity !== "Ville") {
      console.log('Ville sélectionnée:', selectedCity);
      // Ajoutez ici toute autre action que vous souhaitez exécuter lorsque la ville change
    }
  }, [selectedCity]);

  return (
    <div className="App">
      <div className="NavBar">
        <div className="LogoSodexam">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className='Titre'>
          <p>Centre de surveillance météorologique</p>
        </div>
        <div className="Nav_Links">
          <Bouton onCityChange={handleCityChange} />
        </div>
      </div>
      <div className="dashbord">
        <div className="dashbord-info">
          <div className="dashbord-text">
            <h1>Tableaux de bord</h1>
            <h3>date</h3>
          </div>
        </div>
        <div className="meteo-dashbord">
          <div className="dashbord-constante"></div>
          <div className="dashbord-graph"></div>
        </div>
      </div>
      <div className="Informations"></div>
    </div>
  );
}

export default App;
