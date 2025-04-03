import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Pie } from "react-chartjs-2";
import { SinglePie } from "./style.js";


export default function ExercisesByStudentActivity() {

  const { sessionId, courseId, activityId, studentId } = useParams();
  const [exercisesByStudentActivity, setExercisesByStudentActivity] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (sessionId && courseId && activityId) {  
      ;
      const url = `${process.env.REACT_APP_API_URL}/api/session/course/${courseId}/session/${sessionId}/activity/${activityId}/student/${studentId}`
      axios(url)
        .then(res => {
          ;
          if (res.data.exercises) {
            setExercisesByStudentActivity(res.data);
          }
        })
        .catch(err => {
            console.log(err);
        })
    }
  }, [sessionId, courseId, activityId])


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
            label: 'Cantidad de ejercicios',
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
    <div style={{width:"90%", margin:"0 auto", display:"flex", justifyContent:"center"}}>

  {
            chartData && 

                <SinglePie>
                  <h3>Actividad {activityId}</h3>
                  <h5>{studentId}</h5>
                  <Pie data={chartData}/>
                </SinglePie>

     

          }
       </div>
  );
}
