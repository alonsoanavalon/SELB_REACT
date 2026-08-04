import React, { useEffect, useMemo, useState } from 'react';
import { get, set } from 'idb-keyval';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Students from '../components/Students';
import InstrumentsList from '../components/InstrumentsList';
import { getInstrumentRoute } from '../services/instrumentRoutes';
import '../css/student-selection.css';

export function normalizeStudentQuery(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLocaleLowerCase('es');
}

export function sortStudents(students) {
    return [...students].sort((studentA, studentB) => {
        const surnameComparison = String(studentA.surname || '').localeCompare(
            String(studentB.surname || ''),
            'es',
            { sensitivity: 'base' }
        );

        if (surnameComparison !== 0) return surnameComparison;

        return String(studentA.name || '').localeCompare(
            String(studentB.name || ''),
            'es',
            { sensitivity: 'base' }
        );
    });
}

export function filterStudents(students, query) {
    const normalizedQuery = normalizeStudentQuery(query);
    if (!normalizedQuery) return sortStudents(students);

    return sortStudents(students.filter((student) => {
        const searchable = normalizeStudentQuery(
            `${student.name || ''} ${student.surname || ''} ${student.rut || ''}`
        );
        return searchable.includes(normalizedQuery);
    }));
}

async function readCatalog(key) {
    let indexedValue;
    try {
        indexedValue = await get(key);
    } catch (error) {
        indexedValue = null;
    }
    if (Array.isArray(indexedValue)) return indexedValue;

    const localValue = window.localStorage.getItem(key);
    if (!localValue) return [];

    try {
        const parsedValue = JSON.parse(localValue);
        return Array.isArray(parsedValue) ? parsedValue : [];
    } catch (error) {
        return [];
    }
}

export async function persistStudentSelection(student, store = set) {
    const studentName = `${student.name || ''} ${student.surname || ''}`.trim();
    await Promise.all([
        store('selectedStudent', String(student.studentId)),
        store('selectedStudentName', studentName),
        store('selectedStudentGender', student.gender),
    ]);
    return studentName;
}

export default function StudentList() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [catalogState, setCatalogState] = useState('loading');
    const [selectionError, setSelectionError] = useState('');
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        let active = true;

        Promise.all([
            readCatalog('schools'),
            readCatalog('courses'),
            readCatalog('students'),
            readCatalog('instruments'),
        ])
            .then(([schoolData, courseData, studentData, instrumentData]) => {
                if (!active) return;
                setSchools(schoolData);
                setCourses(courseData);
                setStudents(studentData);
                setInstruments(instrumentData);
                setCatalogState('ready');
            })
            .catch(() => {
                if (active) setCatalogState('error');
            });

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        const updateConnection = () => setOnline(navigator.onLine);
        window.addEventListener('online', updateConnection);
        window.addEventListener('offline', updateConnection);

        return () => {
            window.removeEventListener('online', updateConnection);
            window.removeEventListener('offline', updateConnection);
        };
    }, []);

    const schoolOptions = useMemo(() => schools
        .map((school) => ({ value: school.id, label: school.name }))
        .sort((a, b) => String(a.label).localeCompare(String(b.label), 'es', { sensitivity: 'base' })),
    [schools]);

    const courseOptions = useMemo(() => {
        if (!selectedSchool) return [];

        return courses
            .filter((course) => Number(course.school) === Number(selectedSchool.value))
            .map((course) => ({ value: course.course, label: course.courseName }))
            .sort((a, b) => String(a.label).localeCompare(String(b.label), 'es', { sensitivity: 'base' }));
    }, [courses, selectedSchool]);

    const courseStudents = useMemo(() => {
        if (!selectedCourse) return [];
        return students.filter((student) => Number(student.courseId) === Number(selectedCourse.value));
    }, [selectedCourse, students]);

    const visibleStudents = useMemo(
        () => filterStudents(courseStudents, searchQuery),
        [courseStudents, searchQuery]
    );

    const selectSchool = (selectedOption) => {
        setSelectedSchool(selectedOption);
        setSelectedCourse(null);
        setSearchQuery('');
        setSelectedStudent(null);
        setSelectionError('');
    };

    const selectCourse = (selectedOption) => {
        setSelectedCourse(selectedOption);
        setSearchQuery('');
        setSelectedStudent(null);
        setSelectionError('');
    };

    const selectStudent = async (student) => {
        setSelectionError('');

        try {
            const studentName = await persistStudentSelection(student);
            setSelectedStudent({ ...student, displayName: studentName });
        } catch (error) {
            setSelectionError('No fue posible guardar la selección. Intenta nuevamente.');
        }
    };

    const selectInstrument = (instrument) => {
        const route = getInstrumentRoute(instrument.id);
        if (!route) {
            setSelectionError('Este instrumento no tiene una pantalla disponible.');
            return;
        }

        setSelectedStudent(null);
        navigate(route);
    };

    const renderStudentState = () => {
        if (catalogState === 'loading') return 'Cargando alumnos disponibles…';
        if (catalogState === 'error' || schools.length === 0) {
            return 'No hay catálogos disponibles. Conéctate una vez para actualizar los datos.';
        }
        if (!selectedSchool) return 'Selecciona un colegio para comenzar.';
        if (courseOptions.length === 0) return 'Este colegio no tiene cursos disponibles.';
        if (!selectedCourse) return 'Selecciona un curso para ver sus alumnos.';
        if (courseStudents.length === 0) return 'Este curso no tiene alumnos disponibles.';
        if (visibleStudents.length === 0) return 'No hay alumnos que coincidan con la búsqueda.';
        return null;
    };

    const studentState = renderStudentState();

    return (
        <main className="student-selection">
            <header className="student-selection__header">
                <div>
                    <p className="student-selection__eyebrow">Nueva evaluación</p>
                    <h1>Seleccionar estudiante</h1>
                    <p>Elige el curso y luego selecciona un alumno para ver sus instrumentos.</p>
                </div>
                <span className={`student-selection__connection ${online ? 'is-online' : 'is-offline'}`}>
                    {online ? 'En línea' : 'Sin conexión'}
                </span>
            </header>

            <section className="student-selection__filters" aria-label="Filtros de estudiantes">
                <div className="student-selection__field">
                    <label htmlFor="student-school">Colegio</label>
                    <Select
                    inputId="student-school"
                    options={schoolOptions}
                    onChange={selectSchool}
                    value={selectedSchool}
                    placeholder="Seleccionar colegio"
                    isClearable
                    isDisabled={catalogState !== 'ready' || schools.length === 0}
                    noOptionsMessage={() => 'Sin colegios'}
                />
                </div>
                <div className="student-selection__field">
                    <label htmlFor="student-course">Curso</label>
                    <Select
                    inputId="student-course"
                    options={courseOptions}
                    onChange={selectCourse}
                    value={selectedCourse}
                    placeholder="Seleccionar curso"
                    isClearable
                    isDisabled={!selectedSchool || courseOptions.length === 0}
                    noOptionsMessage={() => 'Sin cursos'}
                />
                </div>
                <div className="student-selection__field">
                    <label htmlFor="student-search">Buscar alumno</label>
                    <input
                        id="student-search"
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Nombre o RUT"
                        disabled={!selectedCourse || courseStudents.length === 0}
                    />
                </div>
            </section>

            <section className="student-selection__results" aria-labelledby="student-results-title">
                <div className="student-selection__results-header">
                    <div>
                        <h2 id="student-results-title">Alumnos</h2>
                        <p>{selectedCourse ? `${visibleStudents.length} de ${courseStudents.length} disponibles` : 'Selecciona un curso'}</p>
                    </div>
                </div>

                {selectionError && <p className="student-selection__error" role="alert">{selectionError}</p>}

                {studentState ? (
                    <p className="student-selection__empty">{studentState}</p>
                ) : (
                    <div className="student-selection__table-scroll">
                    <table className="table student-selection__table" id="students-table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><span className="visually-hidden">Género</span></th>
                            <th scope="col">Alumno</th>
                            <th scope="col">RUT</th>
                            <th scope="col">Curso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Students data={visibleStudents} onSelect={selectStudent} />
                    </tbody>
                    </table>
                    </div>
                )}
            </section>

            <InstrumentsList
                instruments={instruments}
                open={Boolean(selectedStudent)}
                selectedStudent={selectedStudent}
                onClose={() => setSelectedStudent(null)}
                onSelect={selectInstrument}
                error={selectionError}
            />
        </main>
    );
}
