import './App.css';
import React, { useState, useEffect } from 'react';
import Logo from './assets/logo.png';
import Bouton from './components/Bouton/Bouton';
import Graph from './components/Graph/Graph';
import Station from './components/Station/Station';
import Avis from './components/Avis/Avis';
import Previ from './components/Previ/Previ';
import 'leaflet/dist/leaflet.css';
import Constante from './components/Constante/Constante';
import Rain from './components/Graph/Rain';
import SolarRadiation from './components/Graph/SolarRadiation';
import DirectVent from './components/Graph/DirectVent';


function App() {
  const [selectedCity, setSelectedCity] = useState("Ville");

  const handleCityChange = (city) => {
    console.log('handleCityChange called with:', city);
    setSelectedCity(city);
  };

  useEffect(() => {
    if (selectedCity !== "Ville") {
      try {
        console.log('Ville sélectionnée:', selectedCity);
      // Ajoutez ici toute autre action que vous souhaitez exécuter lorsque la ville change
      } catch (error) {
        console.error('Error fetching data:', error);
            throw error;
      }
      
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
          <Constante>
            
          </Constante>
          <div className="graph">
            <Graph selectedCity={selectedCity}></Graph>
            <Rain selectedCity={selectedCity}></Rain>
          </div>
          <div className="graph">
            <SolarRadiation selectedCity={selectedCity}></SolarRadiation>
            <DirectVent selectedCity={selectedCity}></DirectVent>
          </div>
        </div>
      </div>
      <div className="Informations">
          <div className='InfoUtile-Previ'>
            <Station></Station>
            <Avis></Avis>
          </div>
          <div className='PrevisionMeteo'>
            <Previ></Previ>
          </div>
      </div>
    </div>
  );
}

export default App;
