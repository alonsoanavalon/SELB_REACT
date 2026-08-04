import React, { useEffect, useMemo, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { get } from 'idb-keyval';
import { useAlert } from 'react-alert';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../css/reports.css';

const FILE_NAMES = { 1: 'TejasLee', 2: 'Precalculo', 3: 'SDQ' };
const multiSelectStrings = {
  selectAll: 'Todos',
  selectSomeItems: 'Seleccionar',
  search: 'Buscar',
  clearSearch: 'Limpiar busqueda',
  allItemsAreSelected: 'Todos seleccionados',
};

const toOption = (label, value, extra = {}) => ({ label, value, ...extra });

export default function Excel() {
  const alert = useAlert();
  const [studies, setStudies] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [moments, setMoments] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudyId, setSelectedStudyId] = useState('');
  const [selectedMomentId, setSelectedMomentId] = useState('');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState('');
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [reportRows, setReportRows] = useState(null);
  const [fileName, setFileName] = useState('instrument');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    let active = true;

    async function loadCatalogs() {
      const [studyData, instrumentData, schoolData, momentData, courseData] = await Promise.all([
        get('studies'),
        get('instruments'),
        get('schools'),
        get('moments'),
        get('courses'),
      ]);

      if (!active) return;

      setStudies(Array.isArray(studyData) ? studyData : []);
      setInstruments(Array.isArray(instrumentData) ? instrumentData : []);
      setMoments(Array.isArray(momentData) ? momentData : []);
      setSchoolOptions((Array.isArray(schoolData) ? schoolData : []).map((school) => toOption(school.name, school.id)));
      setCourses((Array.isArray(courseData) ? courseData : []).map((course) => toOption(course.courseName, course.course, { school: course.school })));
      setIsLoading(false);
    }

    loadCatalogs().catch(() => {
      if (active) setIsLoading(false);
    });

    const updateConnection = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    return () => {
      active = false;
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  const filteredMoments = useMemo(
    () => moments.filter((moment) => String(moment.study_id) === selectedStudyId),
    [moments, selectedStudyId]
  );
  const courseOptions = useMemo(() => {
    const selectedSchoolIds = new Set(selectedSchools.map((school) => String(school.value)));
    return courses.filter((course) => selectedSchoolIds.has(String(course.school)));
  }, [courses, selectedSchools]);
  const yearOptions = useMemo(() => {
    const years = new Set();
    courseOptions.forEach((course) => {
      const year = String(course.label || '').slice(-4);
      if (/^\d{4}$/.test(year)) years.add(year);
    });
    return Array.from(years).sort().map((year) => toOption(year, year));
  }, [courseOptions]);

  useEffect(() => {
    setSelectedYears(yearOptions);
  }, [yearOptions]);

  const generateReport = async () => {
    const schools = selectedSchools.map((school) => school.value);
    let instrument = selectedInstrumentId;

    if (!selectedMomentId || !instrument || schools.length === 0) {
      alert.show('Debes seleccionar estudio, momento, instrumento y al menos un colegio.', { type: 'error' });
      return;
    }

    const data = {
      schools,
      moment: selectedMomentId,
      instrument,
      studyId: selectedStudyId,
      years: (selectedYears.length > 0 ? selectedYears : yearOptions).map((year) => year.value),
    };

    if (instrument === '100') {
      instrument = '6';
      data.instrument = instrument;
      data.countExamples = false;
    }

    setIsGenerating(true);
    setReportRows(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/excel`, data);
      if (!Array.isArray(response.data) || response.data.length === 0) {
        alert.show('No se encontraron datos para los filtros seleccionados.', { type: 'info' });
        return;
      }
      setReportRows(response.data);
    } catch (_error) {
      alert.show('No fue posible generar el reporte. Intenta nuevamente.', { type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadXlsx = () => {
    if (!Array.isArray(reportRows) || reportRows.length === 0) return;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(reportRows);
    worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const reportCount = reportRows ? Math.max(reportRows.length - 1, 0) : 0;

  return (
    <main className="reports-page">
      <header className="reports-header">
        <div>
          <p className="reports-eyebrow">Reporteria</p>
          <h1>Exportar evaluaciones</h1>
          <p>Filtra el reporte y descarga los resultados en formato Excel.</p>
        </div>
        <span className={`reports-connection ${online ? 'is-online' : 'is-offline'}`}>
          {online ? 'En linea' : 'Sin conexion'}
        </span>
      </header>

      <section className="reports-panel" aria-label="Filtros de reporte">
        <div className="reports-panel__header">
          <div>
            <h2>Seleccion de datos</h2>
            <p>Los filtros se aplican al mismo reporte historico existente.</p>
          </div>
        </div>
        {isLoading ? <p className="reports-empty">Cargando catalogos disponibles...</p> : (
          <div className="reports-filters">
            <div className="reports-field">
              <label htmlFor="report-study">Estudio</label>
              <select id="report-study" className="form-select" value={selectedStudyId} onChange={(event) => { setSelectedStudyId(event.target.value); setSelectedMomentId(''); setReportRows(null); }}>
                <option value="">Seleccionar estudio</option>
                {studies.map((study) => <option key={study.id} value={study.id}>{study.name}</option>)}
              </select>
            </div>
            <div className="reports-field">
              <label htmlFor="report-moment">Momento</label>
              <select id="report-moment" className="form-select" value={selectedMomentId} onChange={(event) => setSelectedMomentId(event.target.value)} disabled={!selectedStudyId || filteredMoments.length === 0}>
                <option value="">Seleccionar momento</option>
                {filteredMoments.map((moment) => <option key={moment.id} value={moment.id}>{String(moment.begin).slice(0, 10)} - {String(moment.until).slice(0, 10)}</option>)}
              </select>
            </div>
            <div className="reports-field">
              <label htmlFor="report-instrument">Instrumento</label>
              <select id="report-instrument" className="form-select" value={selectedInstrumentId} onChange={(event) => { setSelectedInstrumentId(event.target.value); setFileName(FILE_NAMES[event.target.value] || 'instrument'); setReportRows(null); }}>
                <option value="">Seleccionar instrumento</option>
                {instruments.map((instrument) => <option key={instrument.id} value={instrument.id}>{instrument.name}</option>)}
                <option value="100">Corsi (sin contar ejemplos)</option>
              </select>
            </div>
            <div className="reports-field reports-field--wide">
              <label>Colegios</label>
              <MultiSelect options={schoolOptions} value={selectedSchools} onChange={(schools) => { setSelectedSchools(schools); setReportRows(null); }} labelledBy="Colegios" overrideStrings={{ ...multiSelectStrings, selectSomeItems: 'Seleccionar colegios' }} />
            </div>
            <div className="reports-field">
              <label>Anios</label>
              <MultiSelect options={yearOptions} value={selectedYears} onChange={setSelectedYears} labelledBy="Anios" disabled={yearOptions.length === 0} overrideStrings={{ ...multiSelectStrings, selectSomeItems: 'Seleccionar anios' }} />
            </div>
            <div className="reports-action">
              <button type="button" className="btn btn-primary" onClick={generateReport} disabled={isGenerating || !online}>
                {isGenerating ? 'Generando reporte...' : 'Generar reporte'}
              </button>
            </div>
          </div>
        )}
      </section>

      {reportRows && (
        <section className="reports-panel reports-result" aria-live="polite">
          <div className="reports-panel__header">
            <div>
              <h2>Reporte listo</h2>
              <p>{reportCount === 1 ? '1 registro encontrado.' : `${reportCount} registros encontrados.`}</p>
            </div>
            <button type="button" className="btn btn-success" onClick={downloadXlsx}>Descargar XLSX</button>
          </div>
          <div className="reports-preview">El archivo incluye encabezados y todos los datos del reporte generado.</div>
        </section>
      )}
    </main>
  );
}