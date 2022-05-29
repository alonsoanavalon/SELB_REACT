import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import manzana from './images/manzana.png';
import manzana_mordida from './images/manzana_mordida.png';

export const Apple = styled.img`  
    width:30px;
    padding:2px;
   
`

export const BittenApple = styled.img` 
    width:30px;
`
export const AppleWrapper = styled.div` 
    position:absolute;
    z-index:100;
    padding:.5rem;
`

Apple.defaultProps = {
    src: manzana
}

BittenApple.defaultProps = {
    src: manzana_mordida
}

