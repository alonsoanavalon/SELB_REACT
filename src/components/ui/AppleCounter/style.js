import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import manzana from './images/manzana.png';
import manzana_mordida from './images/manzana_mordida.png';

export const Apple = styled.div`  
    width:30px;
    height:30px;
    padding:2px;

    display:inline-block;
    border-radius:100%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    
   
`

export const BittenApple = styled.img` 
    width:30px;
`
export const AppleWrapper = styled.div` 
    display:flex;
    gap:.4rem;
    z-index:100;
    padding:.5rem;
`
/* 
Apple.defaultProps = {
    src: manzana
} */

BittenApple.defaultProps = {
    src: manzana_mordida
}

