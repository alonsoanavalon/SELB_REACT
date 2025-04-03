import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { ActivitiesBySession } from "./charts/ActivitiesBySession";
import { GroupedChartWrapper } from './style.js';

export default function SessionsByCourse() {

  const { id } = useParams();
  const [exercisesBySession, setExercisesBySession] = useState();

  useEffect(() => {
    if (id) {
      const url = `${process.env.REACT_APP_API_URL}/api/session/course/${id}`
      axios(url)
        .then(res => {
          setExercisesBySession(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
  }, [id])

  return (
    <>
    <div className="japi-container">
    <h1 style={{margin:"1rem 0 1rem 1rem", color:"#555", fontWeight:"bold"}}>Sesiones por curso</h1>
        {(exercisesBySession?.length > 0) ? <>
          <div style={{display:"flex", flexWrap:"wrap", gap:"1rem", margin:"1rem 0", padding:"1rem", backgroundColor:"#fff"}}>
            {
                exercisesBySession.map((exercises, key) => 
                <GroupedChartWrapper key={key-'chart'}>
                  <ActivitiesBySession key={key-'chart'} courseId={id} data={exercises}/>
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
        </div>
    </>
  );
}
