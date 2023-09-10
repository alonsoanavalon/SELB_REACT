import React, { useCallback, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PieChart from './PieChart';
import SelectChart from './SelectChart';
import axios from 'axios';
import { set, get }from 'idb-keyval';
import { useParams } from 'react-router-dom';
import { PieContainer } from './style.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Charts(props) {

  const { studentRut } = useParams();
  
  const [selectedChart, setSelectedChart] = useState();
  const [studentData, setStudentData] = useState();
  const [chartData, setChartData] = useState([]);

  const displayAlert = useCallback((e) => {
    setSelectedChart(e.target.value)
  }, [setSelectedChart])
  
  useEffect(() => {
    if (selectedChart) {
      if (selectedChart == 1) {

        const url = `https://selb.bond/api/chart/student/${studentRut}`
        axios(url)
        .then(res => {
          ; 
          setStudentData(res.data);
          set('studentChartData', res.data)

        })
      }
    }
  }, [selectedChart, setStudentData])
  

  const groupDataByActivity = useCallback((studentData) => {

    if (studentData) {
      
      const allActivities = studentData.map((exercise) => exercise.activity_id)
      const activities = new Set(allActivities);
  
      const objectActivities = Array.from(activities).map((activityId) => {
        const activityData = {
          activity_id: activityId,
          exercises: [],
        }
        const groupedDataActivity = studentData.filter((exercise) => exercise.activity_id == activityId)
        activityData.exercises = groupedDataActivity;
        return activityData;

      })
      return objectActivities;
    }

  }, [studentData])


  const setChartDataByActivity = useCallback((studentData) => {
    //agrupa por actividad
    const groupedDataByActivity = groupDataByActivity(studentData);
    //parsea, es decir, transforma a 1 o 0
    const parsedDataByActivity = groupedDataByActivity.map((activity) => {
      let completedExercises = 0;
      let failedExercises = 0;
      activity.exercises.forEach((exercise) => {
        //Esto debe contar cuanto es nulo como malo o no? preguntar.
        if (exercise.result == 0 || exercise.result == null) {
          failedExercises++;
        } else if (exercise.result == 1) {
          completedExercises++;
        }
      })
      return {...activity, completedExercises, failedExercises};
    })

    //devolvemos, labels y datasets con la data correspondiente.
    return parsedDataByActivity.map((parsedDataActivity) => {
      return {
        activityId: parsedDataActivity.activity_id,
        chartData: {
          labels: ['Logrado', 'No Logrado'],
          datasets: [
            {
              label: 'Ensayos Logrados y No Logrados',
              data: [parsedDataActivity.completedExercises, parsedDataActivity.failedExercises],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      }
    })

  }, [])


  useEffect(() =>{

    if (studentData && selectedChart) {
      if (selectedChart == 1) {

        const chartDataByActivity = setChartDataByActivity(studentData);

        setChartData(chartDataByActivity)

      }
    }
  }, [studentData, selectedChart])
  
  return <>
    <h1>Gráficos</h1>

    <select onChange={(e) => displayAlert(e)} class="form-select" aria-label="Default select example">
      <option defaultValue="0" value="0">Selecciona un tipo de gráfico</option>
      <option value="1">Nivel de logro por actividad</option>
      <option value="2">Actividades logradas por sesión</option>
      <option value="3">Ensayos logrados por sesión</option>
      <option value="4">Ensayos logrados por actividad</option>
      <option value="5">Habilidades</option>
    </select>

    {
      (selectedChart && chartData) &&
      selectedChart > 0 && <>

        {
          (selectedChart == 1 && chartData.length > 0) && <PieContainer>
            {
              chartData.map((data) =>{
     
                return <PieChart data={data} />
              } 
              

             
              )
            }
           </PieContainer>

          
        }
        {
          selectedChart == 2 && <></>
        }
        {
          selectedChart == 3 && <>Tercer Gráfico</>
        }
        {
          selectedChart == 4 && <>Cuarto Gráfico</>
        }
        {
          selectedChart == 5 && <>Quinto Gráfico</>
        }


      </>
    }



  </>
}
