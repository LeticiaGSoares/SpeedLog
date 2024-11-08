import { styled } from "styled-components";
import React from "react";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";

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

const StyledStatusFilter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const StyledStatusCard = styled.button`
  padding: 12px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px;
  border-style: none;
  outline: 2px solid rgb(149, 149, 149, 0.5);
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#2be88b" : "transparent")};
  outline: ${({ isActive }) =>
    isActive ? "2px solid #2be88b" : "2px solid rgba(149, 149, 149, 0.5)"};
  color: ${({ isActive }) => (isActive ? "white" : "initial")};

  &:hover {
    background-color: #2be88b;
    outline: 2px solid #2be88b;
  }

  @media (min-width: 560px) {
    padding: 15px;
    padding-right: 45px;
    padding-left: 45px;
  }
`;

const StyledIconMoto = styled(TwoWheelerRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledContainerCards = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 600px;
  padding: 20px;
  align-items: center;
  gap: 20px;
  width: 100%;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2be88b;
    border-radius: 10px;
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  background-color: rgb(145, 145, 145, 0.25);
  width: 100%;

  &:hover {
    outline: 3px solid #2be88b;
  }
`;

const StyledCardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background-color: #959595;
  border-radius: 10px;
`;

const StyledContainerText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const StyledInfosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Cards = () => {
  const cardsInfo = [
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Em andamento",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Cancelado",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Concluido",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Em andamento",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Concluido",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Cancelado",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Em andamento",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Concluido",
      data: "01/10/2023",
    },
    {
      nome: "Shopping Pátio Maceió",
      valor: "10,99",
      hora: "09:45",
      status: "Cancelado",
      data: "01/10/2023",
    },
  ];

  return (
    <StyledContainerCards>
      {cardsInfo.map((e, i) => {
        return (
          <>
            <StyledCardContainer>
              <StyledCardIconContainer
                style={{
                  backgroundColor:
                    e.status === "Concluido"
                      ? "#2BE88B"
                      : e.status === "Em andamento"
                      ? "#D3D3D3"
                      : e.status === "Cancelado"
                      ? "#FF3B30"
                      : null,
                }}
              >
                <StyledIconMoto />
              </StyledCardIconContainer>
              <StyledContainerText>
                <StyledInfosContainer>
                  <p>
                    {e.data} {e.hora}
                  </p>
                  <p>{e.valor}</p>
                </StyledInfosContainer>
                <h3>{e.nome}</h3>
              </StyledContainerText>
            </StyledCardContainer>
          </>
        );
      })}
    </StyledContainerCards>
  );
};

const StatusCard = () => {
  const [active, setActive] = React.useState(0);

  const typeStatus = [
    {
      status: "Geral",
    },
    {
      status: "Em andamento",
    },
    {
      status: "Cancelada",
    },
  ];

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <StyledStatusFilter>
      {typeStatus.map((e, i) => {
        return (
          <StyledStatusCard
            key={i}
            isActive={active === i}
            onClick={() => handleClick(i)}
          >
            {e.status}
          </StyledStatusCard>
        );
      })}
    </StyledStatusFilter>
  );
};

const Historico = () => {
  return (
    <>
      <StyledSessionsContainer>
        <StyledSession>
          <h1>Histórico de entregas</h1>
        </StyledSession>
        <StyledSession>
          <StatusCard />
        </StyledSession>
        <StyledSession>
          <Cards />
        </StyledSession>
      </StyledSessionsContainer>
    </>
  );
};

export default Historico;
