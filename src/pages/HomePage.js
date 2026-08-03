import React, { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';
import Swal from 'sweetalert2';
import DashboardHome from '../components/DashboardHome';
import { DASHBOARD_SUMMARY_KEY } from '../services/dashboardSummary';

const CATALOG_KEYS = ['schools', 'courses', 'students', 'instruments'];

function findStudentName(students, studentId) {
  const student = students.find(
    (candidate) => String(candidate.studentId) === String(studentId)
  );
  return student ? `${student.name} ${student.surname}` : '';
}

function findInstrumentName(instruments, instrumentId) {
  const instrument = instruments.find(
    (candidate) => Number(candidate.id) === Number(instrumentId)
  );
  return instrument ? instrument.name : '';
}

function buildRecentActivity(tests, students, instruments) {
  return tests
    .slice(-10)
    .reverse()
    .map((test) => {
      const info = Array.isArray(test) ? test[0] : null;
      if (!info) return null;
      return {
        studentName: findStudentName(students, info.student_id),
        instrumentName: findInstrumentName(instruments, info.instrument),
        date: info.date,
      };
    })
    .filter(Boolean);
}

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [pendingTests, setPendingTests] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [remoteSummary, setRemoteSummary] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const [user, pendingValue, backupValue, studentsValue, instrumentsValue, summary] =
        await Promise.all([
          get('userData'),
          get('completedTests'),
          get('backupTest'),
          get('students'),
          get('instruments'),
          get(DASHBOARD_SUMMARY_KEY),
        ]);

      const pending = Array.isArray(pendingValue) ? pendingValue : [];
      let backup = Array.isArray(backupValue) ? backupValue : null;

      if (backup === null || backup.length === 0) {
        backup = pending;
        await set('backupTest', pending);
      } else if (pending.length > backup.length) {
        backup = pending;
        await set('backupTest', pending);
      }

      if (!active) return;

      setUsername(user?.name || '');
      setPendingTests(pending);
      setRemoteSummary(summary || null);
      setRecentActivity(
        buildRecentActivity(
          backup,
          Array.isArray(studentsValue) ? studentsValue : [],
          Array.isArray(instrumentsValue) ? instrumentsValue : []
        )
      );
    }

    loadDashboard();

    CATALOG_KEYS.forEach((key) => {
      get(key).then((value) => {
        if (value !== undefined) {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      });
    });

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    const handleSummary = (event) => setRemoteSummary(event.detail);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('selb:dashboard-summary', handleSummary);

    return () => {
      active = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('selb:dashboard-summary', handleSummary);
    };
  }, []);

  async function sendNewInstrument() {
    const tests = await get('completedTests');
    if (!Array.isArray(tests) || tests.length === 0) return;

    const activeStudies = await get('studies/active');
    const options = {};
    if (Array.isArray(activeStudies)) {
      activeStudies.forEach((study) => {
        options[study.id] = study.name;
      });
    }

    const { value: studyId } = await Swal.fire({
      title: 'Selecciona un estudio',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Selecciona un estudio',
      showCancelButton: true,
      inputValidator: (value) =>
        value !== '' ? undefined : 'Necesitas seleccionar un estudio',
    });

    if (!studyId) return;

    const result = await Swal.fire({
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#cc4846',
      confirmButtonColor: '#1674d8',
      allowOutsideClick: false,
      confirmButtonText: '¿Deseas enviar los test?',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const batchSize = 30;
        let start = 0;
        let end = Math.min(batchSize, tests.length);
        let updatedCounter = 0;
        let createdCounter = 0;

        while (start < tests.length) {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/newevaluation`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                studyId,
                instruments: tests.slice(start, end),
              }),
            }
          );

          if (!response.ok) {
            Swal.showValidationMessage(
              `Ha ocurrido un error en el envío de datos desde el dispositivo: ${response.statusText}`
            );
            return false;
          }

          const batchResult = await response.json();
          updatedCounter += batchResult.updatedCounter;
          createdCounter += batchResult.createdCounter;
          start = end;
          end = Math.min(end + batchSize, tests.length);
        }

        return {
          updatedCounter,
          createdCounter,
          instrumentsLength: tests.length,
        };
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const confirmation = await Swal.fire({
      showCancelButton: false,
      confirmButtonColor: '#E6BB34',
      showConfirmButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Finalizar',
      title: 'Los test han sido enviados correctamente',
      html: `<b>Total enviados</b>: ${result.value.instrumentsLength}
        <br><b>Ingresados</b>: ${result.value.createdCounter}
        <br><b>Actualizados</b>: ${result.value.updatedCounter}
        <br><br>
        <p>Las evaluaciones registradas a tu nombre corresponden al evaluador original, no necesariamente al último envío.</p>
        <p>En caso de inconsistencias, descarga tu <a href="/respaldo">respaldo</a> y comunícate con el administrador.</p>`,
    });

    if (confirmation.isConfirmed) {
      await set('completedTests', []);
      setPendingTests([]);
      window.location.pathname = '/';
    }
  }

  return (
    <DashboardHome
      username={username}
      pendingTests={pendingTests}
      recentActivity={recentActivity}
      remoteSummary={remoteSummary}
      online={online}
      onSend={sendNewInstrument}
    />
  );
}
