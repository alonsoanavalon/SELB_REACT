import React, {Fragment, useEffect, useState} from 'react';
import Swal from 'sweetalert2'
import { ReportPanelContainer, ReportButton, OtherButton, Container } from './style.ts';
export default function ReportPanel () {

    const openReports = () => {
        window.location.href = '/school-selector'
    }


    return (
        <Fragment>
            <Container>
    
            <ReportPanelContainer>
                <ReportButton onClick={openReports}>
                    Reportes
                </ReportButton>
                <OtherButton>
                    Tutorial
                </OtherButton>
                <OtherButton>
                    Informaciones
                </OtherButton>
                <OtherButton>
                    Recursos
                </OtherButton>
            </ReportPanelContainer>

            </Container>


        </Fragment>
    )
}