import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { set } from "idb-keyval";
import { Bar } from 'react-chartjs-2';
import { sessionActivityExerciseStructure } from '../../utils/sessionActivityExerciseStructure';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ActivitiesBySession(props) {


  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [students, setStudents] = useState();
  const [sessionData, setSessionData] = useState();

  useEffect(() => {
    if (props) {
      const chartOptions = {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: `Sesión ${props.data.sessionId}`,
          },
        },
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

      setOptions(chartOptions)
    }
  }, [props])


  function formatExercises(exercises, sessionActivityExerciseStructure) {

    const students = [];
    const successData = [];
    const errorData = [];
    const activitiesByStudent = exercises.students.map((studentData) => {

      const successResultActivities = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      }

      const errorResultActivities = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      }

      const initialId = sessionActivityExerciseStructure.sessions[exercises.sessionId].startId;
      const lastId = sessionActivityExerciseStructure.sessions[exercises.sessionId].endId;

      for (let activityId = initialId; lastId >= activityId; activityId++) {

        let activitySuccessCounter = 0;
        let activityErrorData = 0;
        studentData.activities.sort((a, b) => a.activityId - b.activityId);
        studentData.activities.forEach((activity) => {
          let studentSuccessCounter = 0;
          let studentErrorCounter = 0;
          if (activity.activityId == activityId) {

            //aca en lugar de recorrer cada ejercicio (que puede que no calce 5 exacto)
            //podria hacerlo por la cantidad sessionActivityExerciseStructure.EXERCISES_BY_ACTIVITY
            //pero creo que ahora no es ideal hacerlo ya que pueden variar y de todas maneras hay que registrar todo
            //preguntar.
            activity.exercises.forEach((exercise) => {
              if (exercise.result == 0) {
                studentErrorCounter++;
              } else if (exercise.result == 1) {
                studentSuccessCounter++;
              } else {
                //aca estan los que obtuvieron un null, hay que considerar estos malos o dejarlos asi? 
                //preguntar.
                studentErrorCounter++

                return;
              }

            })

            //aca evaluamos si es actividad lograda o no lograd
            //por ahora solo depende de si son mas buenas que malas
            //preguntar.
            if (studentSuccessCounter > studentErrorCounter) {
              activitySuccessCounter++;
            } else {
              activityErrorData++;
            }

          }

          successResultActivities[activityId] = activitySuccessCounter;
          errorResultActivities[activityId] = activityErrorData;
        })
      }


      return {
        studentId: studentData.studentName,
        successResultActivities,
        errorResultActivities
      }

    })

    activitiesByStudent.forEach((student) => {

      const successValues = Object.values(student.successResultActivities);
      const errorValues = Object.values(student.errorResultActivities);
      let successCounter = 0;
      let errorCounter = 0;


      successValues.forEach((value) => {
        if (value == 1) {
          successCounter++
        }
      })


      errorValues.forEach((value) => {
        if (value == 1) {
          errorCounter++
        }
      })

      students.push(student.studentId);
      successData.push(successCounter);
      errorData.push(errorCounter)

    })
    
    return {
      students,
      successData,
      errorData
    }
  }

  useEffect(() => {
    if (props && sessionActivityExerciseStructure) {
      const { students, successData, errorData } = formatExercises(props.data, sessionActivityExerciseStructure);
      const labels = students;

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Actividades logradas',
            data: successData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Actividades no logradas',
            data: errorData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };

      setData(chartData)
    }
  }, [props])


  useEffect(() => {
    if (data) {
      const studentData = []
      props.data.students.map((student) => {
        studentData.push({
          studentId: student.studentId,
          studentName: student.studentName
        })
      })
      debugger;
      setStudents(studentData)
    }
  }, [data, props])

  function renderActivitiesBySession () {
    window.location.href = `/session/${props.data.sessionId}/course/${props.courseId}/activities`;
  }

  function renderActivitiesBySessionAndStudent (e) {
    window.location.href = `/session/${props.data.sessionId}/course/${props.courseId}/student/${e.target.value}`;

  }
  return (
    <>
      {
        (data && options) &&
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center"}}>
          <Bar options={options} data={data} />
          <h4 style={{margin:"1rem 0"}} >Opciones</h4>
          <button  onClick={renderActivitiesBySession} className='btn btn-primary btn-parent'>
              Ver actividades evaluadas
            </button>
          <div >
            <select onChange={renderActivitiesBySessionAndStudent} style={{ padding:".5rem", margin:"1rem 0"}} placeholder='Estudiantes' defaultValue="empty">
              <option value="empty" disabled>Ver actividades por estudiante</option>
              {
                students && students.map(student => <option key={student.studentId} value={student.studentId}> {student.studentName}</option>)
              }
            </select>

          </div>


        </div>
      }
    </>
  )
}
