import { useState } from 'react'

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();

    csvFile && console.log(csvFile)

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    e.preventDefault()
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button>
                Submit
            </button>
        </form>
    );

}