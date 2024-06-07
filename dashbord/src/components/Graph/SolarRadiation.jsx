import React, { useEffect, useState } from 'react';
import "./carte.css";
import { Line } from 'react-chartjs-2';
import { fetchSolar } from "../../utils/param";

export default function SolarRadiation({ selectedCity }) {
  const [radiationData, setRadiationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Radiation solaire',
        data: [],
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ],
  });

  useEffect(() => {
    const fetchSolarData = async () => {
      try {
        if (selectedCity && selectedCity !== "Ville") {
          const data = await fetchSolar(selectedCity); // Utilisation de la ville sélectionnée comme endpoint
          const solarData = data.data;

          // Filtrer les données pour les quatre derniers mois de l'année en cours
          const currentYear = new Date().getFullYear();
          const filteredData = solarData.filter(item => {
            const date = new Date(item.DateParam);
            const year = date.getFullYear();
            return year === currentYear;
          });

          // Agréger les données par mois
          const aggregatedRadiation = {};
          filteredData.forEach(item => {
            const date = new Date(item.DateParam);
            const month = date.toLocaleString('default', { month: 'long' }); // Récupérer le nom du mois
            const key = `${month} ${currentYear}`;
            if (!aggregatedRadiation[key]) {
              aggregatedRadiation[key] = [];
            }
            aggregatedRadiation[key].push(item.SolarRadiation);
          });

          // Calculer la moyenne de la radiation solaire par mois
          const labels = Object.keys(aggregatedRadiation);
          const radiationDataByMonth = labels.map(monthYear => {
            const radiationValues = aggregatedRadiation[monthYear];
            const averageRadiation = radiationValues.reduce((acc, curr) => acc + curr, 0) / radiationValues.length;
            return averageRadiation;
          });

          setRadiationData({
            labels: labels,
            datasets: [
              {
                label: 'Radiation solaire',
                data: radiationDataByMonth,
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

    fetchSolarData();
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
