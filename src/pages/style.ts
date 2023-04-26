import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:calc(100% - 60px);
    display:flex;
    justify-content:center;
    align-items:center;
`

export const ReportPanelContainer = styled.div`
    border:1px solid #ccc;
    display:flex;
    flex-wrap:wrap;
    width: 60%;
    height:60%;
    margin:0 auto;
    border-radius:.8rem;
    overflow:hidden;
    cursor:pointer;
`

export const ReportButton = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom:1px solid #ccc;
`

export const OtherButton = styled.div`
    width:33.33%;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid #ccc;
`