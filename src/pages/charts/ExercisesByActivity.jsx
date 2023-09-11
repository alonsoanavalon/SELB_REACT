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

export function ExercisesByActivity(props) {


  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [students, setStudents] = useState();
  const [sessionData, setSessionData] = useState();

  useEffect(() => {
    if (props) {
      debugger;
      const chartOptions = {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: `Actividad ${props.activityId}`,
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

    exercises.students.forEach((studentData) => {
   
        let exerciseSuccessData = 0;
        let exerciseErrorData = 0;
        if (studentData.exercises.length > 0) {
          debugger;
            studentData.exercises[0].forEach((exercise) => {

        

                if (exercise.result == 0) {
                    exerciseErrorData++;
                  } else if (exercise.result == 1) {
                    exerciseSuccessData++;
                  } else {
                    //aca estan los que obtuvieron un null, hay que considerar estos malos o dejarlos asi? 
                    //preguntar.
                    exerciseErrorData++
                  }


     

        })
        }

      
      
      if (exerciseSuccessData != 0 || exerciseErrorData != 0) {
        students.push(studentData.studentName);
        successData.push(exerciseSuccessData);
        errorData.push(exerciseErrorData)
      }


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
      debugger;
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Logrado',
            data: successData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'No logrado',
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

  function renderExercisesByStudentActivity (e) {
    window.location.href = `/session/course/${props.courseId}/session/${props.sessionId}/activity/${props.activityId}/student/${e.target.value}`;
  }

  return (
    <>
      {
        (data && options) &&
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center"}}>
          <Bar options={options} data={data} />
          <h4 style={{margin:"1rem 0"}} >Opciones</h4>
          <div >
            <select onChange={renderExercisesByStudentActivity} style={{ padding:".5rem", margin:"1rem 0"}} placeholder='Estudiantes' defaultValue="empty">
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
