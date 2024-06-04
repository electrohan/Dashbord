import React from 'react'
import "./Station.css"
import { MapContainer, TileLayer, Marker, Popup ,  } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const iconDefault = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
  shadowUrl: iconShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});
const positions = [
    [7.733333 ,-7.616667],
    [7.066667, -4.516667],
    [7.83333,-5.033333],
    [6.983333,-5.75],
    [6.866667,-6.466667],
    [8.75 ,-6.25],
    [9.066667, -5.783333],
    [6.65,-4.7],
    [8.966666,-7.233333],
    [6.75,-7.35],
    [7.416667,-5.2],
    [6.533333,-7.466667],
    [9.6,-5.2],
    [7.4,-6.533333],
    [8.05, -6.183333],
    [7.283333,-4],
    [8.666667, -5.283333],
    [4.95,-6.083333],
    [7.95,-6.666667],
    [5.88333,-4.83333],
    [7.15,-5.21667],
    [8.283334,-7.683333],
    [6.583333,-5.5],
    [7.366667,-6.466667]
  ]
  
  const villes = [
    "Biankouma",
    "Bocanda",
    "Bouake",
    "Bouafle",
    "Daloa",
    "Dianra",
    "Dikodougou",
    "Dimbokro",
    "Dioulatiedougou",
    "Duekoue",
    "Ferke",
    "Guiglo",
    "Korhogo",
    "Mankono",
    "Man",
    "Mbahiakro",
    "Ouelle",
    "Sassandra",
    "Soubre",
    "Tiassale",
    "Tiebissou",
    "Touba",
    "Toumodi",
    "Vavoua"
  ]
L.Marker.prototype.options.icon = iconDefault;
export default function Station() {
    
    const center = [7.5468545, -5.547099500000002];
    return (
        <div className='station' >
            <MapContainer center={center} zoom={5.5}  scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {positions.map((position, index) => (
        <Marker  key={index} position={position}>
           <Popup>
                {villes[index]}
              </Popup>
          
        </Marker>
      ))}
            </MapContainer>
        </div>
    )
}

