import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Pie } from "react-chartjs-2";
import { SinglePie } from "./style.js";
import { ExercisesByActivity } from "./charts/ExercisesByActivity.jsx";
import { GroupedChartWrapper  } from "./style.js";


export default function ActivitiesBySessionAndCourse() {

  const { sessionId, courseId } = useParams();
  const [activitiesBySession, setActivitiesBySession] = useState();


  useEffect(() => {
    if (sessionId && courseId) {  
      const url = `${process.env.REACT_APP_API_URL}/api/session/course/${courseId}/session/${sessionId}/activity`
      axios(url)
        .then(res => {
          ;
          if (res.data) {
            setActivitiesBySession(res.data);
     
          }
        })
        .catch(err => {
            console.log(err);
        })
    }
  }, [sessionId, courseId])

  return (
    <>
        <h1 style={{margin:"1rem 0 1rem 1rem"}}>Actividades por sesión</h1>
        {(activitiesBySession?.length > 0) ? <>
          <div style={{display:"flex", flexWrap:"wrap", gap:"1rem", margin:"1rem 0", padding:"1rem"}}>
            {
                activitiesBySession.map((activity, key) => 
                <GroupedChartWrapper>
                  <ExercisesByActivity key={key-'chart'} courseId={courseId} sessionId={sessionId} activityId={activity.activityId} data={activity}/>
                </GroupedChartWrapper>
                )
            }
            </div>
            </>
          : <>
            <div style={{margin:"1rem 0 1rem 1rem"}}class="spinner-border" role="status">
            </div>
          </>
        }
   </>
  );
}
