
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Authentification from './components/Authehtification/Authentification';
import Dashbord from './components/Dashbord/Dashbord';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' Component={Authentification}/>
          <Route path='/dashboard' Component={Dashbord}/>
        </Routes>
    </Router>
  );
}

export default App;
