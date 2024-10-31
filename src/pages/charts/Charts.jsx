import React, { useCallback, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PieChart from './PieChart';
import SelectChart from './SelectChart';
import axios from 'axios';
import { set, get }from 'idb-keyval';
import { useParams } from 'react-router-dom';
import { PieContainer, SinglePie, StyledContainer } from './style.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Charts(props) {

  const { studentRut } = useParams();
  
  const [selectedChart, setSelectedChart] = useState();
  const [studentData, setStudentData] = useState();
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState();

  const displayAlert = useCallback((e) => {
    setChartData(null)
    setSelectedChart(e.target.value)
  }, [setSelectedChart])

  useEffect(() => {
    if (studentRut) {
      const url = `${process.env.REACT_APP_API_URL}/api/student/${studentRut}`
      axios(url)
      .then(res => {
        setData(res.data[0]);
      })
    }
  }, [])
  
  useEffect(() => {
    if (selectedChart) {
      
      if (selectedChart == 1) {

        const url = `${process.env.REACT_APP_API_URL}/api/chart/student/${studentRut}`
        axios(url)
        .then(res => {
        
          setStudentData(res.data);
          set('studentChartData', res.data)

        })
      } else if (selectedChart == 2) {
        //aca tamos getGroupExercisesBySessionAndActivity
        
        const url = `${process.env.REACT_APP_API_URL}/api/session/student/${studentRut}/activity`
        axios(url)
        .then(res => {
          
          setStudentData(res.data);
          set('studentChartData', res.data)

        })
      } else if (selectedChart == 3) {
        const url = `${process.env.REACT_APP_API_URL}/api/session/student/${studentRut}/exercise`
        axios(url)
        .then(res => {
          
          setStudentData(res.data);
          set('studentChartData', res.data)

        })
      } else if (selectedChart == 4) {
        const url = `${process.env.REACT_APP_API_URL}/api/session/student/${studentRut}/activity/skills`
        axios(url)
        .then(res => {
          
          setStudentData(res.data);
          set('studentChartData', res.data)

        })
      }
    }
  }, [selectedChart, setStudentData, studentRut])
  

  const groupDataByActivity = useCallback((studentData) => {

    if (studentData) {
      
      const allActivities = studentData?.map((exercise) => exercise.activity_id)
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
      activity.exercises?.forEach((exercise) => {
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

  const processDataExercisesBySession = (data) => {
    return data.map((session) => {
      return {

        sessionId: session.sessionId,
        chartData: {
          labels: ['Logrado', 'No Logrado'],
          datasets: [
            {
              label: 'Ensayos Logrados y No Logrados',
              data: [session.successCounter, session.failCounter],
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
        },
      };
    });
  };

  

  const processData = (data) => {
    const sessions = {};
  
    data?.forEach((session) => {
      const sessionData = {
        sessionId: session.sessionId,
        activities: [],
      };
  
      session.activities?.forEach((activity) => {
        const activityData = {
          activityId: activity.activityId,
          chartData: {
            labels: ['Logrado', 'No Logrado'],
            datasets: [
              {
                label: 'Ensayos Logrados y No Logrados',
                data: [activity.successCounter, activity.failCounter],
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
          },
        };
  
        sessionData.activities.push(activityData);
      });
  
      sessions[session.sessionId] = sessionData;
    });
  
    return Object.values(sessions);
  };
  

  const processDataBySkill = (data) => {
    const groupedData = [];

    data?.forEach((entry) => {
      const skillGroup = {
        skillName: entry.skillName,
        skillDescription: entry.skillDescription,
        activities: [],
      };
  
      for (const activityKey in entry.activities) {
        const activity = entry.activities[activityKey];
        skillGroup.activities.push({
          activityId: activity.activityId,
          chartData: {
            labels: ["Logrado", "No Logrado"],
            datasets: [
              {
                label: "Ensayos Logrados y No Logrados",
                data: [activity.successCounter, activity.failCounter],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      }
  
      groupedData.push(skillGroup);
    });
  
    return groupedData;
  };

  useEffect(() =>{

    if (studentData && selectedChart) {
      if (selectedChart == 1) {

        const chartDataByActivity = setChartDataByActivity(studentData);
        setChartData(chartDataByActivity)

      } else if (selectedChart == 2) {

        const chartDataBySession = processData(studentData)
        
        setChartData(chartDataBySession)
      } else if (selectedChart == 3) {
        const chartDataBySession = processDataExercisesBySession(studentData)
        
        setChartData(chartDataBySession)
      } else if (selectedChart == 4) {
        const chartDataBySession = processDataBySkill(studentData)
        
        setChartData(chartDataBySession)
      }
    }
  }, [studentData, selectedChart])

  useEffect(() =>{
    setSelectedChart(4)
  }, [])
  
  return <>

  <div class="japi-container">

    <StyledContainer>
  
  
  {
    data && <h3>
      {data.name} {data.surname}
    </h3>
  }

    <select style={{width:"100%"}}onChange={(e) => displayAlert(e)} class="form-select" aria-label="Default select example">
    <option defaultValue="4" value="2">Actividades logradas por sesión</option>
      <option value="1">Nivel de logro por actividad</option>

      <option value="3">Ensayos logrados por sesión</option>
      <option  value="4">Habilidades</option>

    </select>

    </StyledContainer>

    



  <div style={{width:"100%", backgroundColor:"#fff", padding:"1rem", borderRadius:".5rem"}}>

    <div>

      
    </div>
    {
      (selectedChart && chartData?.length > 0) 
      ? selectedChart > 0 &&
      
        <>


        {
          (selectedChart == 1 && chartData?.length > 0) && <PieContainer>

                        <h2 style={{color:'rgb(103, 184, 210)', fontWeight:"bold"}}>Nivel de logro por actividad</h2>
                        <div style={{width:"100%", display:"flex", flexWrap:"wrap"}}>    
            {
              chartData?.map((data) =>{
     
                return(<>
                <PieChart data={data} />
                </> 
                )
              } 
              

             
              )
            }
</div>
           </PieContainer>

          
        }
        {
          (selectedChart == 2 && chartData?.length > 0) && <PieContainer>

            <h2 style={{color:'rgb(103, 184, 210)', fontWeight:"bold"}}>Actividades logradas por sesión</h2>
          {
            chartData?.map((session) => {
              return (
                <div style={{width:"100%", overflow:"auto", display:"flex", flexWrap:"wrap"}}>
                <h3 style={{textAlign:"center"}}>Sesión {session.sessionId}</h3>
                <>
                  {
                    session && 
                    session.activities?.map((activity) => {
                      return <PieChart data={activity} />
                    })
                  }
                </>
                </div>
              )
            })
          }

           
           </PieContainer>

          
        }
        {
          (selectedChart == 3 && chartData?.length > 0) && <PieContainer>
            <h2 style={{color:'rgb(103, 184, 210)', fontWeight:"bold"}}>Ensayos logrados por sesión</h2>
          {
            chartData?.map(session => {
              return (
                <div style={{width:"100%", overflow:"auto"}}>
                <h3 style={{textAlign:"center"}}>Sesión {session.sessionId}</h3>
                <>
                    <SinglePie>
                      <Pie data={session.chartData}/>
                    </SinglePie>


                </>
                </div>
              )
            })
          }
        
           
           </PieContainer>

          
        }


{
          (selectedChart == 4 && chartData?.length > 0) && <PieContainer>
            <h2 style={{color:'rgb(103, 184, 210)', fontWeight:"bold"}}>Nivel de logro por habilidad</h2>
          {
            chartData?.map((skill) => {
              return (
                
                <div style={{width:"100%", display:"flex", flexDirection:"column", border:"1px solid #ccc", padding:"1rem"}}>
                  <div style={{textAlign:"center"}}>
                <h3 style={{textAlign:"center", color:"#555", fontWeight:"bold"}}>{skill.skillName}</h3>
                <p>{skill.skillDescription}</p>
                </div>
                <div style={{display:"flex", overflow:"auto"}}>
                  {
                    skill.activities?.map((activity) => {
                      return <>
                      <PieChart data={activity} />
                      </>
                    })

                  }
                </div>
                </div>
              )
            })
          }
        
           
           </PieContainer>

          
        }








        


          
        



        </>

        : <h3>Selecciona un tipo de gráfico</h3>  
    }
    </div>

</div>

  </>
}
