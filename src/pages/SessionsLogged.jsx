import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { format } from "@formkit/tempo";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

const ROWS_PER_PAGE = 15;

function SessionsLogged() {
  const [sessionLogged, setSessionLogged] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getSessionLogged = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/session-logged`
      );
      const { sessions } = response.data;
      setSessionLogged(sessions);
    };

    getSessionLogged();
  }, []);

  return (
    <div className="sdq-form-container">
      <h2 className="h2 text-center p-4">
        Registro de ingresos a la plataforma
      </h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo electrónico</th>
            <th>Tipo de usuario</th>
            <th>Fecha de ingreso</th>
          </tr>
        </thead>
        <tbody>
          {sessionLogged
            .slice(ROWS_PER_PAGE * (page - 1), ROWS_PER_PAGE * page)
            .map((session) => (
              <tr key={session.id}>
                <td>#{session.id}</td>
                <td>
                  {session.userName} {session.userSurName}
                </td>
                <td>{session.userEmail}</td>
                <td>
                  {session.userRole === "Admin" && "Administrador"}
                  {session.userRole === "Teacher" && "Profesor"}
                  {session.userRole === "Parent" && "Apoderado"}
                </td>
                <td>
                  {format(session.sessionDate, {
                    date: "medium",
                    time: "medium",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="light"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <FaAnglesLeft style={{ width: "1rem", height: "1rem" }} />
          </Button>
          <Button
            variant="light"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(sessionLogged.length / ROWS_PER_PAGE)}
          >
            <FaAnglesRight style={{ width: "1rem", height: "1rem" }} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default SessionsLogged;
