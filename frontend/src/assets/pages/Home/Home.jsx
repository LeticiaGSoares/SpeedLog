import { styled } from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useEffect } from "react";

const StyledSessionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

const StyledSession = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledIconProfile = styled(AccountCircleIcon)`
  transform: scale(1.2);
`;

const StyledIconSend = styled(SendRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledIconBox = styled(MoveToInboxRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledIconStore = styled(StorefrontRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const StyledCardContainer = styled(Link)`
  text-decoration: none;
  color: #000000;
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  background-color: rgb(145, 145, 145, 0.25);
  width: 100%;

  &:hover {
    outline: 3px solid #2BE88B;
  }
`;

const StyledCardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background-color: #2BE88B;
  border-radius: 10px;
`;

const StyledContainerText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Home = () => {
  const [ userData, setUserData ] = useState([])
  const idUsuario = localStorage.getItem("usuario_id")

  const getInfoUserAxios = async () => {
    await axios.get(`http://localhost:3333/api/usuario/pesquisar/${idUsuario}`).then((response) => setUserData(response.data.message))
  }

  useEffect(() => {
    getInfoUserAxios()
  }, [])

  return (
    <>
      <StyledSessionsContainer>
        <StyledSession>
          <StyledIconProfile />
          <h1>Olá, {userData.nome}</h1>
        </StyledSession>
        <StyledSession>
          <h2>Escolha uma opção de entrega</h2>
        </StyledSession>
        <StyledSession>
          <StyledContainerCards>
            <StyledCardContainer to="/entrega/enviar">
              <StyledCardIconContainer>
                <StyledIconSend />
              </StyledCardIconContainer>
              <StyledContainerText>
                <h3>Enviar um item</h3>
                <p>Informe o peso, endereço de destino e origem da entrega</p>
              </StyledContainerText>
            </StyledCardContainer>
            <StyledCardContainer to="/entrega/receber">
              <StyledCardIconContainer>
                <StyledIconBox />
              </StyledCardIconContainer>
              <StyledContainerText>
                <h3>Receber item</h3>
                <p>Informe o peso, endereço de destino e origem da entrega</p>
              </StyledContainerText>
            </StyledCardContainer>
            <StyledCardContainer to="/entrega/pedidoLoja">
              <StyledCardIconContainer>
                <StyledIconStore />
              </StyledCardIconContainer>
              <StyledContainerText>
                <h3>Retirar pedido na loja</h3>
                <p>Informe o peso, endereço de destino e origem da entrega</p>
              </StyledContainerText>
            </StyledCardContainer>
          </StyledContainerCards>
        </StyledSession>
      </StyledSessionsContainer>
    </>
  );
};

export default Home;
