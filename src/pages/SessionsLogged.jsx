import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { format } from "@formkit/tempo";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import "../css/operations.css";

const ROWS_PER_PAGE = 15;

function SessionsLogged() {
  const [sessionLogged, setSessionLogged] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const getSessionLogged = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/session-logged`
        );
        const { sessions = [] } = response.data;
        const newestFirst = [...sessions].sort((first, second) => {
          const firstTime = new Date(first.sessionDate).getTime();
          const secondTime = new Date(second.sessionDate).getTime();

          if (Number.isNaN(firstTime) || Number.isNaN(secondTime)) {
            return Number(second.id) - Number(first.id);
          }

          return secondTime - firstTime;
        });

        setSessionLogged(newestFirst);
        setPage(1);
      } catch (error) {
        setLoadError("No fue posible cargar el registro de ingresos.");
      } finally {
        setIsLoading(false);
      }
    };

    getSessionLogged();
  }, []);

  const totalPages = Math.max(1, Math.ceil(sessionLogged.length / ROWS_PER_PAGE));
  const visibleSessions = sessionLogged.slice(
    ROWS_PER_PAGE * (page - 1),
    ROWS_PER_PAGE * page
  );

  return (
    <main className="operations-page">
      <header className="operations-header">
        <div>
          <p className="operations-eyebrow">Administración</p>
          <h1>Registro de ingresos</h1>
          <p>Los ingresos más recientes se muestran primero.</p>
        </div>
        <span className="operations-chip">{sessionLogged.length} registros</span>
      </header>

      <section className="operations-panel" aria-labelledby="sessions-table-title">
        <div className="operations-panel__header">
          <div>
            <h2 id="sessions-table-title">Actividad de usuarios</h2>
            <p>Historial de accesos registrados en la plataforma.</p>
          </div>
        </div>

        {isLoading && <p className="operations-status">Cargando registros...</p>}
        {loadError && <p className="operations-status operations-status--error">{loadError}</p>}
        {!isLoading && !loadError && sessionLogged.length === 0 && (
          <p className="operations-status">Aún no hay ingresos registrados.</p>
        )}
        {!isLoading && !loadError && visibleSessions.length > 0 && (
          <>
            <Table responsive className="operations-table">
              <thead>
                <tr>
                  <th scope="col">Registro</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo electrónico</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Fecha de ingreso</th>
                </tr>
              </thead>
              <tbody>
                {visibleSessions.map((session) => (
                  <tr key={session.id}>
                    <td>#{session.id}</td>
                    <td>{session.userName} {session.userSurName}</td>
                    <td>{session.userEmail}</td>
                    <td>{
                      session.userRole === "Admin" ? "Administrador" :
                        session.userRole === "Teacher" ? "Profesor" :
                          session.userRole === "Parent" ? "Apoderado" : session.userRole
                    }</td>
                    <td>{format(session.sessionDate, { date: "medium", time: "medium" })}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="operations-pagination">
              <span>Página {page} de {totalPages}</span>
              <ButtonGroup aria-label="Paginación de ingresos">
                <Button
                  variant="light"
                  title="Página anterior"
                  aria-label="Página anterior"
                  onClick={() => setPage((current) => current - 1)}
                  disabled={page === 1}
                >
                  <FaAnglesLeft />
                </Button>
                <Button
                  variant="light"
                  title="Página siguiente"
                  aria-label="Página siguiente"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={page >= totalPages}
                >
                  <FaAnglesRight />
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default SessionsLogged;
