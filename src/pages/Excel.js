import React, {Fragment, useEffect, useState} from 'react';
import { MultiSelect } from "react-multi-select-component";
import {get} from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios';
import { CSVLink } from "react-csv";

export default function Excel () {

    const alert = useAlert()
    const [selected, setSelected] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState([])
    const [studies, setStudies] = useState([])
    const [instruments, setInstruments] = useState([])
    const [moments, setMoments] = useState([])
    const [schoolOptions, setSchoolOptions] = useState([])
    const [csvData, setCsvData] = useState()
    const [fileName, setFileName] = useState()
    const [filteredMoments, setFilteredMoments] = useState([])
    const [studyId, setStudyId] = useState()
    const [courses, setCourses] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);

    useEffect(() => {

        get('studies')
        .then(res => setStudies(res))

        get('instruments')
        .then(res => setInstruments(res))

        get('schools')
        .then(res => res.map(school => {
            let obj = {}
            obj['label'] = school.name
            obj['value'] = school.id
            setSchoolOptions(prevVal => [...prevVal, obj])
        }))
        
        get('moments')
        .then(res => setMoments(res));

        get('courses')
        .then(res => {
            let courses = []
            res.forEach(course => {
                let obj = {}
                obj['label'] = course.courseName
                obj['value'] = course.course
                obj['school'] = course.school
                courses.push(obj)
            })
            setCourses(courses)
        })

    }, [])


        useEffect(() => {
            if (selected.length > 0 && courses.length > 0) {
                let schoolIds = selected.map(s => s.value);
                let filteredCourses = courses.filter(course => schoolIds.includes(course.school));
                setCourseOptions(filteredCourses);
    
                let yearsSet = new Set();
                filteredCourses.forEach(course => {
                    let courseName = course.label;
                    if (courseName && courseName.length >= 4) {
                        let year = courseName.slice(-4);
                        yearsSet.add(year);
                    }
                });
                let yearsOptionsArr = Array.from(yearsSet).map(year => ({ label: year, value: year }));
                yearsOptionsArr.sort((a, b) => a.value.localeCompare(b.value));
                setYearOptions(yearsOptionsArr);
                if (selectedYears.length === 0) {
                    setSelectedYears(yearsOptionsArr);
                }
            } else {
                setYearOptions([]);
                setSelectedYears([]);
            }
        }, [selected, courses]);

    const setMomentsFiltered = (e) => {
        setStudyId(e.target.value)
        setFilteredMoments(moments.filter(moment => moment.study_id == e.target.value))
    }

    const renderStudies = ()  => {
        return studies.map(study => <option key={study.id}value={study.id}> {study.name}</option>)
    }

    const renderInstruments = () => {
        return instruments.map(instrument =><option key={instrument.id}value={instrument.id}> {instrument.name}</option> )
    }

    const getSelectedSchool = () => {
        let schoolArray = []
        selected.forEach(school => {
            schoolArray.push(school.value)
        })
        setSelectedSchool(schoolArray)    
        const schoolIds = schoolArray.map(school => school.value)
        let filteredCourses = courses.filter(course => schoolIds.includes(course.school))
        setCourseOptions(filteredCourses)
        return schoolArray
    }


    const getMoment = () => {
        let studies = document.getElementById("momentSelect")
        let selectedMoment = studies.value
        return selectedMoment
    }


    const getInstrument = () => {
        let studies = document.getElementById("instrumentSelect")
        let selectedInstrument = studies.value
        return selectedInstrument
    }

    const getFileName = (instrumentId) => {

        switch(instrumentId) {
            case "1": 
                setFileName("TejasLee");
                break;
            case "2": 
                setFileName("Precálculo");
                break;
            case "3": 
                setFileName("SDQ");
                break;
            default:
                setFileName("instrument");
                break;
        }
    }

    const getCsv = () => {
        const schools = getSelectedSchool()
        const moment = getMoment()
        let instrument = getInstrument()

        const dataObject = {}

        if (instrument == 100) {
            instrument = 6;
            dataObject['countExamples'] = false;
        }

        setCsvData(undefined)

        if (moment === 'empty' || instrument === 'empty' || schools.length < 1) {
           
            alert.show('Debe elegir cada una de las opciones', {
                type:'error'
            })
        } else {
            
            dataObject['schools'] = schools
            dataObject['moment'] = moment
            dataObject['instrument'] = instrument
            dataObject['studyId'] = studyId
            dataObject['years'] = (selectedYears.length > 0 ? selectedYears : yearOptions).map(item => item.value);


            getFileName(instrument)

            
            axios({
                method: 'post',
                url:  /*'http://localhost:3500/excel'||*/ 'https://selb.bond/excel',
                data: dataObject
            })
            .then(
                res => {
                    setCsvData(res.data)
                }
            )

        }
    }

   
    
    return (
        <Fragment>
            {/* <CsvReader />  Este nos servirá cuando queramos meter datos, ya que lee CSV*/}
            <div className='excel-container'>
            <h2>Reportes en formato CSV</h2>
            <select  className="form-select" onChange={setMomentsFiltered}placeholder='Estudios' id="studySelect" defaultValue="empty">
                <option value="empty" disabled>Estudios</option>
                {renderStudies()}
            </select>   

            <select  className="form-select" placeholder='Momentos' id="momentSelect" defaultValue="empty">
                <option value="empty">Momentos</option>
                {
                    filteredMoments.length > 0 && 
                        filteredMoments.map(moment => <option key={moment.id}value={moment.id}> {moment.begin.slice(0, 10)} - {moment.until.slice(0,10)}</option>)
                }
            </select>   

            <div>
            <MultiSelect
                options={schoolOptions}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                overrideStrings={
                    {   selectAll:"Todos",
                        selectSomeItems:"Colegios",
                        search:"Buscar",
                        clearSearch: "Limpiar Búsqueda",
                        allItemsAreSelected: "Todos han sido seleccionados"
                    }}
            />

            </div>


                <div style={{ marginTop: "1rem" }}>
                    <MultiSelect
                        options={yearOptions}
                        value={selectedYears}
                        onChange={setSelectedYears}
                        labelledBy="Select Años"
                        overrideStrings={{
                            selectAll:"Todos",
                            selectSomeItems:"Años",
                            search:"Buscar",
                            clearSearch: "Limpiar Búsqueda",
                            allItemsAreSelected: "Todos han sido seleccionados"
                        }}
                    />
                </div>


            <select  className="form-select" placeholder='Instrumentos' id="instrumentSelect" defaultValue="empty">
                <option value="empty" disabled>Instrumentos</option>
                <optgroup label="Principales">
                {renderInstruments()}
                </optgroup>
                    <optgroup label="Otros">
                    <option key={100} value={100}>Corsi (sin contar ejemplos) </option> 

                </optgroup>

                

            </select>   
            
            <button id="btn-excel"className='btn btn-primary' onClick={getCsv}>Obtener datos</button>

            {
                 csvData !== undefined && 
                 <Fragment>
                     <CSVLink className="btn btn-success "filename={fileName}data={csvData}>Descargar</CSVLink>
                 </Fragment>
            }



  </div>
  </Fragment>




    )
}