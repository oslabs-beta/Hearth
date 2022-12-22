import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = { 
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      onClick: (e, legendItem, legend) => {
        const index = legendItem.datasetIndex;
        const ci = legend.chart;
        if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            legendItem.hidden = true;
        } else {
            ci.show(index);
            legendItem.hidden = false;
        }
    }
    },
    title: {
      display: true,
      text: 'Duration',
    },
  },
};

// dynamic depending on invocation times
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      // get data from cloudwatch logs
      data: [1, 5, 2, 3, 8, 10, 4],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // hidden: true
    },
  ],
};

const Duration = () => {
  return( <Line options={options} data={data} />);
}

export default Duration;
  
