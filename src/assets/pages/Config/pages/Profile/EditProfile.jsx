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
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledProfileContainer = styled.div`
  display: flex;
  width: 100%;
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

const StyledInfoEditContainer = styled.div`
  label,
  input {
    color: #000000;
  }

  div {
    width: 100%;
    border-bottom: 2px solid #000000;
  }

  div input {
    width: 98%;
    border: none;
    height: 30px;
  }

  div input:focus {
    outline: none;
  }

  display: flex;
  flex-direction: column;
  width: 400px;
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
          <StyledInfoEditContainer>
            <label>Email</label>
            <div><input/></div>
          </StyledInfoEditContainer>
        </StyledSession>
      </StyledSessionsContainer>

    </>
  )
}

export default ViewProfile