import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Line } from 'react-chartjs-2';
import { fetchAirTemp } from "../../utils/param";
import io from 'socket.io-client';
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

export default function Graph({ selectedCity }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Température (degré)',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ],
  });

  useEffect(() => {
    if (selectedCity && selectedCity !== "Ville") {
      const fetchData = async () => {
        try {
          const data = await fetchAirTemp(selectedCity);
          const temperatures = data.data;

          // Filtrer les données pour le jour J
          const today = new Date();
          const todayStr = today.toISOString().slice(0, 10); // Format: "YYYY-MM-DD"

          const filteredTemps = temperatures.filter(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            const dateStr = date.toISOString().slice(0, 10);
            return dateStr === todayStr;
          });

          // Préparer les labels et les données pour le graphique
          const labels = filteredTemps.map(item => {
            const date = new Date(item.DateParam.replace(/"/g, ''));
            let hours = date.getHours().toString().padStart(2, '0');
            return hours;
          });

          const temperatureData = filteredTemps.map(item => item.AirTemp);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Température (degré)',
                data: temperatureData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
              }
            ],
          });
        } catch (error) {
          console.error("Error fetching temperature data:", error);
        }
      };
      fetchData();
    } else {
      setChartData({
        labels: [],
        datasets: [
          {
            label: 'Température (degré)',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          }
        ],
      });
    }
  }, [selectedCity]);

  return (
    <div className='dasbord-graph'>
      {selectedCity === "Ville" ? (
        <p>Veuillez sélectionner une ville pour voir les données.</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
}
