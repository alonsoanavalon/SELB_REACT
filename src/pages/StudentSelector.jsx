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
import { useEffect, useState } from "react";
import axios from 'axios'
import { get, set } from "idb-keyval";
import { DataTableContainer, CenteredContainer } from "./style.ts";
import { useNavigate } from "react-router-dom";

export default function StudentSelector() {

  const navigate = useNavigate()


  const [students, setStudents] = useState()

  useEffect(() => {
    get('selectedCourse')
    .then(id => {
      const url = `http://164.92.71.11:8000/api/student/course/${id}`
      axios(url)
        .then(res => {
          setStudents(res.data);
        })
    }) 

  }, [])

  const showStudentCharts = (studentRut) => {
    debugger;
    set('selectedStudentRut', studentRut)
    .then((
      navigate(`/charts/${studentRut}`)
    ))
  }


  return (
    <>
      {
        students &&
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
                      Click me
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
                  <Filter placeholder="Nombre del estudiante"/>
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
                  <PaginationOptions/>
                </Col>
              </Row>
              <Table>
                <TableHeader />
                <TableBody />
              </Table>
              <Pagination />
            </DatatableWrapper>
            
          </DataTableContainer>
        </CenteredContainer>
      }

    </>
  );
}
