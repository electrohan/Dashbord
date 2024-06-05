import React ,{ useState, useEffect } from 'react'
import "./Station.css"
import { MapContainer, TileLayer, Marker, Popup ,  } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {fetchStation} from "/Dashbord-client/dashbord/src/utils/Station"
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

L.Marker.prototype.options.icon = iconDefault;
export default function Station() {
    const [stations, setStations] = useState([]);
    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const results = await fetchStation();
          setStations(results);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
      fetchDataFromApi();
    }, []);
    const center = [7.5468545, -5.547099500000002];
    return (
        <div className='station' >
            <MapContainer center={center} zoom={5.5}  scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
               {stations.map((station, index) => (
          <Marker key={index} position={[station.LAT, station.LONG]}>
            <Popup>
              {station.STATION}
            </Popup>
          </Marker>
        ))}

            </MapContainer>
        </div>
    )
}

