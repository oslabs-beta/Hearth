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



const Duration = (props) => {
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
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const invocationDuration = [];
  for(let i = 0; i < 10; i++) {
    invocationDuration.push(props.logData[i].Duration);
  }
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        // get data from cloudwatch logs
        data: invocationDuration,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // hidden: true
      },
    ],
  };

  return( 
  <div>
    <Line options={options} data={data} />
  </div>
  );
}

export default Duration;
  
