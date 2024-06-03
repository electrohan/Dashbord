import "./App.css";
import React from 'react';


function App() {

  return (
    <div className="App">
      <div className="NavBar"></div>
      <div className="dashbord">
        <div className="dashbord-info">
          <h1>Tableaux de bord</h1>
          <h3>date</h3>
        </div>
        <div className="meteo-dashbord">
          <div className="dashbord-constante"></div>
          <div className="dashbord-graph">
            
          </div>
        </div>
      </div>
      <div className="Informations"></div>
    </div>
  );
}
export default App;
