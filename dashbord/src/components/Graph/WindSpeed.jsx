import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchWindSpeed } from "../../utils/param";
import "./carte.css";
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

export default function WindSpeed({ selectedCity }) {
  const [windData, setWindData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Vitesse du vent (m/s)',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      }
    ],
  });

  useEffect(() => {
    if (selectedCity && selectedCity !== "Ville") {
      const fetchData = async () => {
        try {
          const data = await fetchWindSpeed(selectedCity);
          const windSpeedData = data.data;

          // Filtrer les données pour le jour J
          const today = new Date();
          const todayStr = today.toISOString().slice(0, 10); // Format: "YYYY-MM-DD"

          const filteredWind = windSpeedData.filter(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            const dateStr = date.toISOString().slice(0, 10);
            return dateStr === todayStr;
          });

          // Préparer les labels et les données pour le graphique
          const labels = filteredWind.map(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            let hours = date.getHours().toString().padStart(2, '0');
            return hours;
          });

          const windSpeeds = filteredWind.map(item => item.WindSpeed);

          setWindData({
            labels,
            datasets: [
              {
                label: 'Vitesse du vent (m/s)',
                data: windSpeeds,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
              }
            ],
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des données de vent:", error);
        }
      };
      fetchData();
    } else {
      setWindData({
        labels: [],
        datasets: [
          {
            label: 'Vitesse du vent (m/s)',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
          }
        ],
      });
    }
  }, [selectedCity]);

  return (
    <div className='dasbord-graph'>
      {selectedCity === "Ville" ? (
        <p>Veuillez sélectionner une ville pour voir les données de vitesse du vent.</p>
      ) : (
        <Line data={windData} />
      )}
    </div>
  );
}
