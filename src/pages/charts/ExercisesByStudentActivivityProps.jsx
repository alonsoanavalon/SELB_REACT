import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Pie } from "react-chartjs-2";
import { SinglePie } from "./style.js";


export default function ExercisesByStudentActivityProps(props) {

  const [exercisesByStudentActivity, setExercisesByStudentActivity] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (props) {
        ;
        setExercisesByStudentActivity(props.exercises)
    }
  }, [props])


  const formatChartDataByExercises = useCallback((courseData) => {
    let completedExercises = 0;
    let failedExercises = 0;

    courseData?.forEach((exercise) => {
  

      //Esto debe contar cuanto es nulo como malo o no? preguntar.
      if (exercise.result == 0 || exercise.result == null) {
        failedExercises++;
      } else if (exercise.result == 1) {
        completedExercises++;
      }
    })

    const parsedData = { completedExercises, failedExercises }

    return {
        labels: ['Ejercicios logrados', 'Ejercicios no logrados'],
        datasets: [
          {
            label: ['Cantidad de ejercicios'],
            data: [parsedData.completedExercises, parsedData.failedExercises],
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

  }, [])

  useEffect(() => {
    if (exercisesByStudentActivity) {
 
      const student = exercisesByStudentActivity.studentId;

      //preguntar.
      //aca lo mismo, estamos considerando a null como error
      ;
      const data = formatChartDataByExercises(exercisesByStudentActivity.exercises[0])
      ;
      setChartData(data)

    }
  }, [exercisesByStudentActivity])

  return (
<>
  {
            chartData && 

                <SinglePie>
                  <h3>Actividad {exercisesByStudentActivity.activityId}</h3>
                  <Pie data={chartData}/>
                </SinglePie>

     

          }
</>
  );
}
