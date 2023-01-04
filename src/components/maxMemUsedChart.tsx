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

interface Props {
  logData: Array<any> | string;
}

const MaxMemUsed = (props: Props) => {
  const options = {
    type: 'line',
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: 'Max Memory Used',
        font: {
          size: 25
        }
      }
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
          text: 'Megabytes (MB)'
        }
      }
    }
  };
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

  const invocationMaxMemUsed = [];

  if (props.logData.length > 10) {
    for (let i = 10; i >= 0; i--) {
      invocationMaxMemUsed.push(props.logData[i].MaxMemUsed);
    }
  } else {
    for (let i = props.logData.length - 1; i >= 0; i--) {
      invocationMaxMemUsed.push(props.logData[i].MaxMemUsed);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        data: invocationMaxMemUsed,
        borderColor: '#90e0ef',
        backgroundColor: '#caf0f8'
      }
    ]
  };

  return (
    <div>
      <Line options={options} data={data} style={{width: '700px', height: '700px'}} />
    </div>
  );
}

export default MaxMemUsed;
