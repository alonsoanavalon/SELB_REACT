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
          mode: 'nearest',
          intersect: false,
          axis: 'y'
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
      let successResultActivities = 0;
      let errorResultActivities = 0;
      //preguntar. aca no estamos considerando los nulos

      studentData.activities.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            if (exercise.result == 0) {
              errorResultActivities++
            } else if (exercise.result == 1) {
              successResultActivities++
            }

        })
      })

      return {
        studentId: studentData.studentName,
        successResultActivities,
        errorResultActivities
      }

    })

    activitiesByStudent.forEach((student) => {


      students.push(student.studentId);
      successData.push(student.successResultActivities);
      errorData.push(student.errorResultActivities)

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
            label: 'Ejercicios logrados por actividad',
            data: successData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Ejercicios no logrados por actividad',
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
