import React, { Fragment, useEffect } from 'react'
import ListedInstrument from '../components/ListedInstrument'

export default function InstrumentsList (props) {


    useEffect(() => {

        document.addEventListener("click", e => {
            if (e.target.matches('#instruments-list-wrapper')) {
                const $instrumentsList = document.querySelector("#instruments-list-wrapper")
                $instrumentsList.setAttribute("class", 'hidden')
            }
        })

    }, [])


    return (
        <Fragment>
            <div id="instruments-list-wrapper" className='hidden'>
                <div id="instruments-list">
                    <h4> </h4>
                    <h4>TESTS</h4>
                    <h4> </h4>
                    {(() => {
                        // Filtrar y ordenar los instrumentos
                        const instruments = props.instruments
                            .filter(instrument => instrument['instrument_type_id'] === 1 && instrument['id'] <= 26)
                            .sort((a, b) => a.name.localeCompare(b.name));
                        
                        // Definir columnas
                        const columnA = [];
                        const columnB = [];
                        const columnC = [];
                        const columns = [];

                        let height1 = Math.ceil(instruments.length / 3);
                        let height2 = instruments.length % 3 === 2 ? height1 : Math.floor(instruments.length / 3);
                        
                        // Distribuir elementos en columnas
                        instruments.forEach((item, index) =>
                        {
                            if (index + 1 <= height1)
                                columnA.push(item);
                            else if (index + 1 <= height1 + height2)
                                columnB.push(item);
                            else
                                columnC.push(item);
                        });
                        
                        // Mezclar columnas
                        const maxLength = Math.max(columnA.length, columnB.length, columnC.length);
                        for (let i = 0; i < maxLength; i++)
                        {
                            if (i < columnA.length) columns.push(columnA[i]);
                            if (i < columnB.length) columns.push(columnB[i]);
                            if (i < columnC.length) columns.push(columnC[i]);
                        }
                        
                        // Renderizar los instrumentos
                        return columns.map((data, index) =>
                        (
                            <ListedInstrument key={data.id || index} instrument={data} />
                        ));
                    })()}
                </div>
            </div>
        </Fragment>
    )
    

}