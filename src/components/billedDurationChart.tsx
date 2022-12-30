import * as React from 'react';
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

const BilledDuration = (props) => {
  const options = {
    type: 'line',
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Billed Duration',
        font: {
          size: 25
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (UTC)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Milliseconds (ms)'
        }
      }
    }
  };

  // dynamic depending on invocation times
  const labels = [];

  if (props.logData.length > 10) {
    for (let i = 10; i >= 0; i--) {
      const timestamp = `${props.logData[i].Date} ${props.logData[i].Time}`;
      labels.push(timestamp);
    }
  } else {
    for (let i = props.logData.length - 1; i >= 0; i--) {
      const timestamp = `${props.logData[i].Date} ${props.logData[i].Date}`
      labels.push(timestamp);
    }
  }

  const invocationBilledDuration = [];

  if (props.logData.length > 10) {
    for (let i = 10; i >= 0; i--) {
      invocationBilledDuration.push(props.logData[i].BilledDuration);
    }
  } else {
    for(let i = props.logData.length - 1; i >= 0; i--) {
      invocationBilledDuration.push(props.logData[i].BilledDuration);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        // get data from cloudwatch logs
        data: invocationBilledDuration,
        borderColor: '#90e0ef',
        backgroundColor: '#caf0f8',
      },
    ],
  };

  return(
  <div>
    <Line options={options} data={data} style={{width: '700px', height: '700px'}}/>
  </div>
  );
}

export default BilledDuration;
