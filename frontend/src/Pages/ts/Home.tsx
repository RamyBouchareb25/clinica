import { MultiChart } from "../../components/ts/MultiChart";
import { RadarChart } from "../../components/ts/RadarChart";
import VerticalChart from "../../components/ts/VerticalChart";
import '../scss/charts.scss';


export default function Home() {
  return (
    <div className='home-container'>
      <div className="container-1">
        <VerticalChart  />
        <MultiChart />
      </div>
      <div className="container-2">
        <RadarChart />
      </div>
    </div>
  )
}
