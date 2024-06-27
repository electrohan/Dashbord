import React, { useState, useEffect } from 'react';
import "./Constante.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh,faMinus,faDroplet ,faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {fetchLastWindir,fetchLastAirTemp,fetchLastSolarRadiation} from "../../utils/param"
export default function Constante({ selectedCity }) {
    const [windDirection, setWindDirection] = useState(null); // État local pour la direction du vent
    const [AirTemp,setAirTemp]=useState(null);
    const [RadiationSolaire, setRadiationSolaire]=useState(null);
    // Effet de côté pour récupérer la direction du vent lors du chargement initial ou lorsque selectedCity change
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedCity && selectedCity !== "Ville") {
                    const WindirData = await fetchLastWindir(selectedCity);
                    const AirTempData = await fetchLastAirTemp(selectedCity);
                    const SolarData =await fetchLastSolarRadiation(selectedCity);
                    setWindDirection(WindirData.WindDir);
                    setAirTemp(AirTempData.AirTemp);
                    setRadiationSolaire(SolarData.SolarRadiation);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de direction du vent:', error);
            }
        };

        fetchData(); // Appel de la fonction pour récupérer les données de direction du vent
    }, [selectedCity]);
    return (
        <div className="dashbord-constante">
            <div className="humidite">
                <div className='valeur'><p>{RadiationSolaire}</p> </div>
                <div>
                    <p className='ecrito'>Radiation Solarire</p>
                    <p><FontAwesomeIcon icon={faDroplet} size="3xs" /></p>
                </div>
            </div>
            <div className="température">
                <div className='valeur'><p>{AirTemp}</p></div>
                <div>
                    <p className='ecrito'>Température</p>
                    <p><FontAwesomeIcon icon={faTemperatureHigh} size="3xs" style={{color: "#63E6BE",}} />  <FontAwesomeIcon icon={faTemperatureHigh} size="3xs" style={{color: "#ff3300",}} /></p>
                </div> 
            </div>
            <div className="vent">
                <div className='valeur'><p>{windDirection}</p></div>
                <div>
                    <p className='ecrito'>Direction du vent</p>
                    {windDirection !== null ? (
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            size="3xs"
                            style={{
                                transform: `rotate(${windDirection}deg)`,
                                color: '#1E90FF', // Couleur du vent
                            }}
                        />
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
            </div>
        </div>
    )
}
