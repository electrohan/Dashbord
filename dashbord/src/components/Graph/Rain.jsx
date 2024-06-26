import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Bar } from 'react-chartjs-2';
import { fetchRain } from "../../utils/param";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
          const data = await fetchRain(selectedCity);
          const rainData = data;

          // Filtrer les données pour le jour J
          const today = new Date();
          const todayStr = today.toISOString().slice(0, 10); // Format: "YYYY-MM-DD"

          const filteredRain = rainData.filter(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            const dateStr = date.toISOString().slice(0, 10);
            return dateStr === todayStr;
          });

          // Préparer les labels et les données pour le graphique
          const labels = filteredRain.map(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            let hours = date.getHours().toString().padStart(2, '0');
            return hours;
          });

          const rainAmounts = filteredRain.map(item => item.Rain);

          setRainData({
            labels,
            datasets: [
              {
                label: 'Quantité de pluie (mm)',
                data: rainAmounts,
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
