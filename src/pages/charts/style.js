import styled from 'styled-components';

export const PieContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items: center;
    gap:2rem;
`

export const SinglePie = styled.div`
   display:flex;
   flex-direction:column;
   gap:1rem;
   margin-top:4rem;
    justify-content:center;
    align-items: center;
    width:22%;
    @media (max-width: 768px) {
        width: 90%;
    }
`

export const StyledContainer = styled.div`
    width: 40%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    align-self: flex-start;
    box-shadow: #ccc 0px 1px 5px 0px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;