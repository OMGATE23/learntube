import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Study Analysis',
    },
  },
};

const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export function BarChart({chartData}) {

//   useEffect(() => {
//     let earData = JSON.parse(localStorage.getItem("eardata"));
//     setEarData(earData);
//   }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of videos completed',
        data: chartData,
        backgroundColor: 'rgba(0, 153, 246, 1)',
      }
    ],
  };
  
  return <Bar options={options} data={data} />;
}