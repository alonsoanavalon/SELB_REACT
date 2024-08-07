import React, { Fragment, useState, useEffect } from 'react';
import { get } from 'idb-keyval';
import Select from 'react-select';
import Students from '../components/Students';
import InstrumentsList from '../components/InstrumentsList';

export default function StudentList() {

    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => { 
        get('schools').then(schools => {
            if (!schools) {
                let localSchools = window.localStorage.getItem('schools');
                if (localSchools) {
                    localSchools = JSON.parse(localSchools);
                    setSchools(localSchools);
                }
            } else {
                setSchools(schools);
            }
        });

        get('courses').then(courses => {
            if (!courses) {
                let localCourses = window.localStorage.getItem('courses');
                if (localCourses) {
                    localCourses = JSON.parse(localCourses);
                    setCourses(localCourses);
                }
            } else {
                setCourses(courses);
            }
        });

        get('students').then(students => {
            if (!students) {
                let localStudents = window.localStorage.getItem('students');
                if (localStudents) {
                    localStudents = JSON.parse(localStudents);
                    setStudents(localStudents);
                }
            } else {
                setStudents(students);
            }
        });

        get('instruments')
        .then(data => {
            if (!data) {
                let localInstruments = window.localStorage.getItem('instruments');
                if (localInstruments) {
                    localInstruments = JSON.parse(localInstruments);
                    return localInstruments.filter(instrument => instrument['instrument_type_id'] === 1);
                }
            } else {
                return data.filter(instrument => instrument['instrument_type_id'] === 1 && instrument['id'] < 12);
            }
        })
        .then(filteredInstruments => setInstruments(filteredInstruments));
    
    }, []);

    const renderSchools = () => {
        return schools?.map(school => ({ value: school.id, label: school.name }));
    }

    const getCourses = (selectedOption) => {
        setSelectedSchool(selectedOption);
        setSelectedCourse(null); // Desseleccionar el curso

        if (selectedOption) {
            let schoolId = selectedOption.value;
            let filteredCourses = courses.filter(course => parseInt(course.school) === parseInt(schoolId));
            let filteredCoursesToRender = filteredCourses.map(course => ({ value: course.course, label: course.courseName }));

            setFilteredCourses(filteredCoursesToRender);
        } else {
            setFilteredCourses([]);
        }
    }

    const getStudents = (selectedOption) => {
        setSelectedCourse(selectedOption);

        if (selectedOption) {
            let courseId = selectedOption.value;
            let filteredStudents = students.filter(student => parseInt(student.courseId) === parseInt(courseId));
        
            setFilteredStudents(filteredStudents);
        } else {
            setFilteredStudents([]);
        }
    }

    return (
        <Fragment>
            <div className="student-list-wrapper">
                <Select
                    options={renderSchools()}
                    onChange={getCourses}
                    value={selectedSchool}
                    placeholder="Colegios"
                    isClearable
                />
                <Select
                    options={filteredCourses}
                    onChange={getStudents}
                    value={selectedCourse}
                    placeholder="Cursos"
                    isClearable
                    isDisabled={filteredCourses.length === 0}
                />
                <table className="table" id="students-table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Alumno</th>
                            <th scope="col">Rut</th>
                            <th scope="col">Curso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Students data={filteredStudents} />
                    </tbody>
                </table>
                <div>
                    <InstrumentsList instruments={instruments} />
                </div>
            </div>
        </Fragment>
    );
}
