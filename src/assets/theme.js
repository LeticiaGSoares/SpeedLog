const theme = {
    colors: {
        greenRegular: '#2BE88B',
        greenDark: '#1A6850',
        greenDarkOpct: 'rgba(26,104,80,.5)',
        red: '#FF3B30',
        greyLight: "#E6E6E6",
        greyLightOpct:'#E6E6E6',
        greyRegular: '#959595',
        greyDark: '#464A4C',
        white: '#FFFFFF'
    }
};

import styled from 'styled-components';

// Contêiner principal do mapa
export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

// Contêiner para exibição de informações
export const InfoContainer = styled.div`
  margin-left: 10%;
  padding: 40px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  position: absolute;
  z-index: 9999;
  display:flex;
  flex-direction: column;
  gap: 5px;
  top: 0;
  width: 80%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const MarkerInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: #333;

  
`;

export const Input = styled.input`
     width: 100%;
     padding: 5px;

    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
`



export default theme;