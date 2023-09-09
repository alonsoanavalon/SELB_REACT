import React, { useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { SinglePie } from './style.js'


ChartJS.register(ArcElement, Tooltip, Legend);



export default function PieChart(props) {
  return <>
    <SinglePie>
      {
        props.data.activityId && <h2>Actividad #{props.data.activityId}</h2>
      }

    <Pie data={props.data.chartData} />
    </SinglePie>

  </>;
}
