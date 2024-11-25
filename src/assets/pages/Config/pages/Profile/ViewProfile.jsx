import styled from "styled-components";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const StyledSessionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledSession = styled.div`
  div {
    color: #ffffff;
    font-weight: 600;
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledProfileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  align-items: center;
  padding: 30px;
  flex-direction: column;
  max-height: 400px;
  background-color: #2BE88B;
`

const StyledIconArrowBack = styled(ArrowBackRoundedIcon)`
  transform: scale(1.2);
`;

const StyledIconPencil = styled(CreateRoundedIcon)`
  transform: scale(1.2);
`;

const StyledIconProfile = styled(AccountCircleRoundedIcon)`
  font-size: 200px !important;
`;

const StyledProfileContanierButtons = styled.div`
width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledProfileContanierInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const StyledProfileContainerIcon = styled.div`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
`

const StyledProfileContainerName = styled.div`
  padding: 5px;
  border-bottom: 2px solid #ffffff;
`

const StyledProfileContainerAdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 160%;
`

const StyledProfileContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const StyledAllInfosView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  width: 100%;
`

const StyledInfoViewContainer = styled.div`
  label {
    color: #00000096;
  }

  h3 {
    font-weight: 600;
    color: #000000;
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 5px;
`


const ViewProfile = () => {
  return (
    <>
      <StyledSessionsContainer>
        <StyledSession>
          <StyledProfileContainer>
            <StyledProfileContanierButtons>
              <StyledIconArrowBack />
              <StyledIconPencil />
            </StyledProfileContanierButtons>
            <StyledProfileContanierInfo>
              <StyledProfileContainerIcon>
                <StyledIconProfile />
              </StyledProfileContainerIcon>
              <StyledProfileContainerName>
                <h1>Christiano S. S. Lima</h1>
              </StyledProfileContainerName>
              <StyledProfileContainerAdditionalInfo>
                <StyledProfileContainerInfo>
                  <h1>30</h1>
                  <h2 style={{ fontWeight: "400" }}>Pedidos</h2>
                </StyledProfileContainerInfo>
                <StyledProfileContainerInfo>
                  <h1>4,8</h1>
                  <h2 style={{ fontWeight: "400" }}>Avaliação</h2>
                </StyledProfileContainerInfo>
                <StyledProfileContainerInfo>
                  <h1>2</h1>
                  <h2 style={{ fontWeight: "400" }}>Meses</h2>
                </StyledProfileContainerInfo>
              </StyledProfileContainerAdditionalInfo>
            </StyledProfileContanierInfo>
          </StyledProfileContainer>
          <StyledAllInfosView>
            <StyledInfoViewContainer>
              <label>Email</label>
              <h3>chr*******@gmail.com</h3>
            </StyledInfoViewContainer>
            <StyledInfoViewContainer>
              <label>Número</label>
              <h3>(82) 9****-4099</h3>
            </StyledInfoViewContainer>
            <StyledInfoViewContainer>
              <label>Cidade</label>
              <h3>Maceió/AL</h3>
            </StyledInfoViewContainer>
            <StyledInfoViewContainer>
              <label>Data de nascimento</label>
              <h3>01/04/1995</h3>
            </StyledInfoViewContainer>
            <StyledInfoViewContainer>
              <h3 style={{ color: "#ff0000" }}>Alterar senha</h3>
            </StyledInfoViewContainer>
          </StyledAllInfosView>
        </StyledSession>
      </StyledSessionsContainer>

    </>
  )
}

export default ViewProfile