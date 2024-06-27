import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Line } from 'react-chartjs-2';
import { fetchSolar } from "../../utils/param";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SolarRadiation({ selectedCity }) {
  const [radiationData, setRadiationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Radiation solaire',
        data: [],
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCity && selectedCity !== "Ville") {
          const data = await fetchSolar(selectedCity);
          const solarData = data.data;
          
           // Filtrer les données pour le jour J
           const today = new Date();
           const todayStr = today.toISOString().slice(0, 10); // Format: "YYYY-MM-DD"
           
          const filteredData = solarData.filter(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            const dateStr = date.toISOString().slice(0, 10);
            return dateStr === todayStr;
          });

          // Préparer les labels et les données pour le graphique
          const labels = filteredData.map(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            let hours = date.getHours().toString().padStart(2, '0');
            return hours;
          });

          const radiationDataHourly = filteredData.map(item => item.SolarRadiation);
          console.log(filteredData)
          setRadiationData({
            labels: labels,
            datasets: [
              {
                label: 'Radiation solaire',
                data: radiationDataHourly,
                fill: false,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              }
            ],
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de radiation solaire:", error);
      }
    };

    fetchData();
  }, [selectedCity]);

  return (
    <div className='dasbord-graph'>
      {selectedCity === "Ville" ? (
        <p>Veuillez sélectionner une ville pour voir les données de radiation solaire.</p>
      ) : (
        <Line data={radiationData} />
      )}
    </div>
  );
}
