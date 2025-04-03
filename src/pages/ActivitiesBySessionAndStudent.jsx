import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Pie } from "react-chartjs-2";
import { SinglePie } from "./style.js";
import ExercisesByStudentActivity from "./ExercisesByStudentActivity.jsx";
import ExercisesByStudentActivityProps from "./charts/ExercisesByStudentActivivityProps.jsx";


export default function ActivitiesBySessionAndStudent() {

  const { sessionId, courseId, studentId } = useParams();
  const [exercisesByStudentActivity, setExercisesByStudentActivity] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (sessionId && courseId && studentId) {  

      const url = `${process.env.REACT_APP_API_URL}/api/session/course/${courseId}/session/${sessionId}/student/${studentId}`
      axios(url)
        .then(res => {
          ;
          if (res.data) {

            setExercisesByStudentActivity(res.data);

          }
        })
        .catch(err => {
            console.log(err);
        })
    }
  }, [sessionId, courseId, studentId])

  return (
    <>
    <h2>Estudiante: {studentId}</h2>
    <div style={{width:"90%", margin:"0 auto", display:"flex", justifyContent:"center", flexWrap:"wrap"}}>

      {
        exercisesByStudentActivity?.length > 0 ?
        exercisesByStudentActivity.map((activity) => 
          <ExercisesByStudentActivityProps exercises={activity}/>
        )
        : <>
        <div style={{margin:"1rem 0 1rem 1rem"}}class="spinner-border" role="status">
        </div>
      </>
      }
      

       </div>
       </>
  );
  
}
