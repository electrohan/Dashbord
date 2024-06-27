import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Radar } from 'react-chartjs-2';
import { fetchWinDir } from "../../utils/param";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const toRadians = (degrees) => degrees * (Math.PI / 180);
const toDegrees = (radians) => radians * (180 / Math.PI);

const averageWindDirection = (angles) => {
  const sinSum = angles.reduce((sum, angle) => sum + Math.sin(toRadians(angle)), 0);
  const cosSum = angles.reduce((sum, angle) => sum + Math.cos(toRadians(angle)), 0);
  return toDegrees(Math.atan2(sinSum, cosSum));
};

export default function WindDirection({ selectedCity }) {
  const [winDirData, setWinDirData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Direction du vent',
        data: [],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  });

  useEffect(() => {
    const fetchWinDirData = async () => {
      try {
        if (selectedCity && selectedCity !== "Ville") {
          const data = await fetchWinDir(selectedCity); // Utilisation de la ville sélectionnée comme endpoint
          const winDirData = data.data;

          // Filtrer les données pour les quatre derniers mois de l'année en cours
          const currentYear = new Date().getFullYear();
          const filteredData = winDirData.filter(item => {
            const date = new Date(item.DateParam);
            const year = date.getFullYear();
            const month = date.getMonth();
            return year === currentYear && month >= new Date().getMonth() - 5;
          });

          // Agréger les données par mois
          const aggregatedWinDir = {};
          filteredData.forEach(item => {
            const date = new Date(item.DateParam);
            const month = date.toLocaleString('default', { month: 'long' }); // Récupérer le nom du mois
            const key = `${month} ${currentYear}`;
            if (!aggregatedWinDir[key]) {
              aggregatedWinDir[key] = [];
            }
            aggregatedWinDir[key].push(item.WinDir);
          });

          // Calculer la moyenne de la direction du vent par mois
          const labels = Object.keys(aggregatedWinDir);
          const winDirDataByMonth = labels.map(monthYear => {
            const winDirValues = aggregatedWinDir[monthYear];
            // Pour la direction du vent, calculer la moyenne des angles
            const averageWinDir = averageWindDirection(winDirValues);
            return averageWinDir;
          });

          setWinDirData({
            labels: labels,
            datasets: [
              {
                label: 'Direction du vent (en degrés)',
                data: winDirDataByMonth,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }
            ],
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de direction du vent:", error);
      }
    };

    fetchWinDirData();
  }, [selectedCity]);

  return (
    <div className='dasbord-graph'>
      {selectedCity === "Ville" ? (
        <p>Veuillez sélectionner une ville pour voir les données de direction du vent.</p>
      ) : (
        <Radar data={winDirData} />
      )}
    </div>
  );
}
