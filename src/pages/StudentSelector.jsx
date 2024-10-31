import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from "react-bs-datatable";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios'
import { get, set } from "idb-keyval";
import { DataTableContainer, CenteredContainer, SinglePie } from "./style.js";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";

export default function StudentSelector() {

  const navigate = useNavigate()


  const [students, setStudents] = useState()
  const [courseData, setCourseData] = useState()
  const [courseId, setCourseId] = useState()
  const [chartData, setChartData] = useState()

  useEffect(() => {
    get('selectedCourse')
      .then(id => setCourseId(id))
  }, [])

  useEffect(() => {
    if (courseId) {
      const url = `${process.env.REACT_APP_API_URL}/api/student/course/${courseId}`
      axios(url)
        .then(res => {
          setStudents(res.data);
        })
    }
  }, [courseId])

  const showStudentCharts = (studentRut) => {
    set('selectedStudentRut', studentRut)
      .then((
        navigate(`/charts/${studentRut}`)
      ))
  }


  useEffect(() => {
    if (courseId) {
      const url = `${process.env.REACT_APP_API_URL}/api/exercise/course/${courseId}`
      axios(url)
        .then(res => {
          setCourseData(res.data);
          set('courseData', res.data)

        })
    }

  }, [setCourseData, courseId])




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
        labels: ['Logrado', 'No Logrado'],
        datasets: [
          {
            label: 'Ensayos Logrados y No Logrados',
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

    if (courseData) {
      const data = formatChartDataByExercises(courseData);
      setChartData(data)
      ;
    }
  }, [courseData])

 const sendToSessions = useCallback(() => {
    navigate(`/sessions/course/${courseId}`);
  }, [courseId])
  return (
    <>
      {
        (students && chartData) ?     <div className="japi-container">
          <CenteredContainer>
            <DataTableContainer>
              <DatatableWrapper
                body={students}
                headers={[
                  {
                    prop: "name",
                    title: "Estudiante",
                    isFilterable: true,
                    isSortable: true
                  },
                  {
                    prop: "surname"
                  },
                  {
                    prop: "rut",
                    title: "Rut"
                  },
                  {
                    prop: "school",
                    title: "Colegio"
                  },
                  {
                    prop: "button",
                    cell: (row) => (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) => showStudentCharts(row.rut)}
                      >
                        Ver detalle
                      </Button>
                    )
                  }
                ]}
                paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 10,
                    options: [5, 10, 15, 20]
                  }
                }}
              >
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Filter placeholder="Nombre del estudiante" />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                  >

                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <PaginationOptions />
                  </Col>
                </Row>
                <Table>
                  <TableHeader />
                  <TableBody />
                </Table>
                <Pagination />
              </DatatableWrapper>

            </DataTableContainer>
        
            {
            chartData.datasets && 
            <SinglePie>
              <h3>Ejercicios logrados por curso</h3>
              <Pie data={chartData}/>
              <button onClick={sendToSessions} className="btn btn-primary">Ver sesiones</button>
            </SinglePie>

          }
          </CenteredContainer>
  
        </div>
        : 
        <>No se han encontrado datos</>
      }

    </>
  );
}
