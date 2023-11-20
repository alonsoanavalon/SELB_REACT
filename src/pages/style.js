import styled from 'styled-components';

export const CenteredContainer = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    border:1px solid #ccc;
    width:90%;
    margin:1rem auto;
    background-color:#fff;

`

export const SinglePie = styled.div`
   display:flex;
   flex-direction:column;
   gap:1rem;
   margin-top:4rem;
    justify-content:center;
    align-items: center;
    width:35%;
`
export const DataTableContainer = styled.div`
    width: 80%;
    padding:2rem;
    margin:4rem auto;

`

export const Container = styled.div`
    width:100%;
    height:calc(100% - 60px);
    background-image: url('/images/japi-background.jpg');
    background-size:cover;
    background-repeat:no-repeat;
    display:flex;
    justify-content:center;
    align-items:center;
`

export const ReportPanelContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    width: 60%;
    height:60%;
    margin:0 auto;
    border-radius:.8rem;
    overflow:hidden;
    cursor:pointer;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 11px 1px

`

export const ReportButton = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom:1px solid #ccc;
    background-color:#1674D8;
    color:#fff;
    font-size:1.5rem;
    font-weight:bold;
`

export const OtherButton = styled.div`
    width:33.33%;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid #ccc;
    background-color:#38A3A5;
    color:#fff;
    font-size:1.5rem;
    font-weight:bold;
`

export const GroupedChartWrapper = styled.div`
    border:1px solid #ccc;
    width:48%;
    padding:.5rem;
`

export const WelcomeMessage = styled.div`
    background-color: #67B8D2;
    color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    display: block; /* Mostrar por defecto en todos los dispositivos */

    @media (max-width: 768px) {
        display: none; /* Ocultar en dispositivos con ancho menor o igual a 768px (celulares) */
    }
`;