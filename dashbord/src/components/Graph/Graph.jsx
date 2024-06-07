import React ,{ useEffect, useState }from 'react'
import "./carte.css"
import { Line } from 'react-chartjs-2';
import {fetchAirTemp} from "../../utils/param"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  RadialLinearScale, 
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement, // Importer BarElement
  Title,
  Tooltip,
  Legend
);
export default function Graph({ selectedCity }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Température (degre)',
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
  
          // Agréger les données par mois pour l'année en cours
          const aggregatedTemperatures = {};
          const currentYear = new Date().getFullYear();
          temperatures.forEach(item => {
            const date = new Date(item.DateParam);
            const year = date.getFullYear();
            if (year === currentYear) {
              const month = date.toLocaleString('default', { month: 'long' }); // Récupérer le nom du mois
              const key = `${month} ${year}`;
              if (!aggregatedTemperatures[key]) {
                aggregatedTemperatures[key] = [];
              }
              aggregatedTemperatures[key].push(item.AirTemp);
            }
          });
  
          // Calculer la moyenne des températures par mois
          const labels = Object.keys(aggregatedTemperatures);
          const temperatureData = labels.map(monthYear => {
            const temps = aggregatedTemperatures[monthYear];
            const averageTemp = temps.reduce((acc, curr) => acc + curr, 0) / temps.length;
            return averageTemp;
          });
  
          setChartData({
            labels,
            datasets: [
              {
                label: 'Température',
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
            label: 'Température',
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
        <Line data={chartData}/>
      )}
    </div>
  )
}
