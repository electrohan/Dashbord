import React from 'react'
import "./Constante.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh,faMinus,faWind,faDroplet } from '@fortawesome/free-solid-svg-icons'
export default function Constante() {
    return (
        <div className="dashbord-constante">
            <div className="humidite">
                <div className='valeur'><p>24</p> </div>
                <div>
                    <p className='ecrito'>Humidité</p>
                    <p><FontAwesomeIcon icon={faDroplet} size="3xs" />10</p>
                </div>
            </div>
            <div className="température">
                <div className='valeur'><p>31</p></div>
                <div>
                    <p className='ecrito'>Température</p>
                    <p><FontAwesomeIcon icon={faTemperatureHigh} size="3xs" style={{color: "#63E6BE",}} />27  <FontAwesomeIcon icon={faTemperatureHigh} size="3xs" style={{color: "#ff3300",}} />34  <FontAwesomeIcon icon={faMinus} size="2xs" />7</p>
                </div> 
            </div>
            <div className="vent">
                <div className='valeur'><p>17</p></div>
                <div>
                    <p className='ecrito'>Vitesse du Vent</p>
                    <p><FontAwesomeIcon icon={faWind} size="3xs" />14</p>
                </div>
            </div>
        </div>
    )
}
