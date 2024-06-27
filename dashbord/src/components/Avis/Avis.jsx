import React , { useState, useEffect }from 'react'
import "./Avis.css"
import {fetchAvis} from "../../utils/user"
export default function Avis({ selectedCity }) {
  const [AvisData, setAvisData] = useState({});

  useEffect(() => {
    if (selectedCity && selectedCity !== "Ville"){
      const fetchData = async () => {
        try {
          const data = await fetchAvis(selectedCity);
          
          if (data.length > 0) {
            setAvisData(data[0]);
          } else {
            setAvisData({});
          }
          console.log(AvisData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [selectedCity]);
  return (
    <div className='AvisPrevi'>
      <div className='Titre-Avis'>
        <h3 className='Titre-Section'>AVIS PREVISIONNISTE</h3>
      </div>
      <div className='avis'>{AvisData.texte?AvisData.texte :"Choisissez une station"}</div>
      <div className='PreviMember'>
        <div className='StationName'>{AvisData.station? AvisData.station: "Choisissez une station"}</div>
        <div className='PublisherDate'>{AvisData.date ? new Date(AvisData.date).toLocaleString() : "Choisissez une station"}</div>
      </div>
    </div>
  )
}
