import React, {Fragment, useEffect, useState} from 'react';
import { MultiSelect } from "react-multi-select-component";
import {get} from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios';


export default function Excel () {

    const alert = useAlert()
    const [selected, setSelected] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState([])
    const [studies, setStudies] = useState([])
    const [instruments, setInstruments] = useState([])
    const [schoolOptions, setSchoolOptions] = useState([])

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

    }, [])

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
        return schoolArray
    }

    const getStudy = () => {
        let studies = document.getElementById("studySelect")
        let selectedStudy = studies.value
        return selectedStudy
    }

    const getInstrument = () => {
        let studies = document.getElementById("instrumentSelect")
        let selectedInstrument = studies.value
        return selectedInstrument
    }

    const getCsv = () => {
        let schools = getSelectedSchool()
        let study = getStudy()
        let instrument = getInstrument()
        let dataObject = {}

        if (study === 'empty' || instrument === 'empty' || schools.length < 1) {
           
            alert.show('Debe elegir cada una de las opciones', {
                type:'error'
            })
        } else {
            
            dataObject['schools'] = schools
            dataObject['study'] = study
            dataObject['instrument'] = instrument


            axios({
                method: 'post',
                url:  /* 'http://localhost:3500/excel'|| */'https://selb.bond/excel',
                data: dataObject
            });

        }

    }
    


    return (
        <Fragment>
            <div className='excel-container'>
            <h2>Reportes en formato CSV</h2>
            <select  className="form-select" placeholder='Estudios' id="studySelect" defaultValue="empty">
                <option value="empty" disabled>Estudios</option>
                {renderStudies()}
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

            <select  className="form-select" placeholder='Instrumentos' id="instrumentSelect" defaultValue="empty">
                <option value="empty" disabled>Instrumentos</option>
                {renderInstruments()}
            </select>   
            
            <button id="btn-excel"className='btn btn-primary' onClick={getCsv}>Obtener datos</button>

  </div>
  </Fragment>




    )
}