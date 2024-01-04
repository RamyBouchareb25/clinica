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
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rémissions par mois',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Femmes',
        data: labels.map(() => 10),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Hommes',
        data: labels.map(() => 10),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

export default function VerticalChart() {
  return (
    <div className='vertical-container'>
        <Bar options={options} data={data} />
    </div>
  )
}
