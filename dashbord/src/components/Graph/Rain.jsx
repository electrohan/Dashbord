import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Bar } from 'react-chartjs-2'; // Utiliser le composant Bar de react-chartjs-2
import { fetchRain } from "../../utils/param";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement, 
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement, // Importer BarElement
    Title,
    Tooltip,
    Legend
  );
export default function Rain({ selectedCity }) {
  const [rainData, setRainData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quantité de pluie (mm)',
        data: [],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ],
  });

  useEffect(() => {
    if (selectedCity && selectedCity !== "Ville") {
      const fetchData = async () => {
        try {
          const data = await fetchRain(selectedCity); // Utilisation de la ville sélectionnée comme endpoint
          const RainData = data.data
          // Agréger les données par mois pour l'année en cours
          const aggregatedRain = {};
          const currentYear = new Date().getFullYear();
          RainData.forEach(item => {
            const date = new Date(item.DateParam);
            const year = date.getFullYear();
            if (year === currentYear) {
              const month = date.toLocaleString('default', { month: 'long' }); // Récupérer le nom du mois
              const key = `${month} ${year}`;
              if (!aggregatedRain[key]) {
                aggregatedRain[key] = [];
              }
              aggregatedRain[key].push(item.Rain);
            }
          });

          // Calculer la somme des quantités de pluie par mois
          const labels = Object.keys(aggregatedRain);
          const rainDataByMonth = labels.map(monthYear => {
            const rainAmounts = aggregatedRain[monthYear];
            const totalRain = rainAmounts.reduce((acc, curr) => acc + curr, 0);
            return totalRain;
          });

          setRainData({
            labels: labels,
            datasets: [
              {
                label: 'Quantité de pluie (mm)',
                data: rainDataByMonth,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }
            ],
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des données de pluie:", error);
        }
      };

      fetchData();
    } else {
      setRainData({
        labels: [],
        datasets: [
          {
            label: 'Quantité de pluie (mm)',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }
        ],
      });
    }
  }, [selectedCity]);

  return (
    <div className='dasbord-graph'>
      {selectedCity === "Ville" ? (
        <p>Veuillez sélectionner une ville pour voir les données de pluie.</p>
      ) : (
        <Bar data={rainData} /> 
      )}
    </div>
  );
}
