import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ['Cardiologie', 'Neurologie', 'Urologie', 'Rhumatologie', 'ORL', 'Generale'],
  datasets: [
    {
      label: '# of Patients',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export function RadarChart() {
  return (
  <div className='radar-container'>
    <Radar data={data} />
  </div>
  )
}
