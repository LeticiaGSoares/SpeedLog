import { styled } from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from "react-router-dom";

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
  color: white;
  transform: scale(1.2);
`;

const StyledIconLocation = styled(LocationOnRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledIconOut = styled(LogoutRoundedIcon)`
  color: white;
  transform: scale(1.2);
`;

const StyledContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  background-color: rgb(145, 145, 145, 0.25);

  &:hover {
    outline: 3px solid #2BE88B;
  }
`;

const StyledCardContainerOut = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  background-color: transparent;

  &:hover {
    outline: 3px solid red;
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

const StyledLink = styled("a")`
  width: 100%;
  text-decoration: none;
  color: black;
`;

const Config = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("token", null)
    navigate("/")
  }

  return (
    <>
      <StyledSessionsContainer>
        <StyledSession>
          <h2>Configurações</h2>
        </StyledSession>
        <StyledSession>
          <StyledContainerCards>
            <StyledLink href="/config/profile">
              <StyledCardContainer>
                <StyledCardIconContainer>
                  <StyledIconProfile />
                </StyledCardIconContainer>
                <StyledContainerText>
                  <h3>Editar perfil</h3>
                  <p>Ver perfil, alterar dados da conta, email e senha</p>
                </StyledContainerText>
              </StyledCardContainer>
            </StyledLink>
            <StyledLink href="#">
              <StyledCardContainer>
                <StyledCardIconContainer>
                  <StyledIconLocation />
                </StyledCardIconContainer>
                <StyledContainerText>
                  <h3>Gerenciar locais favoritos</h3>
                  <p>Ver locais facoritos criar e alterar endereços</p>
                </StyledContainerText>
              </StyledCardContainer>
            </StyledLink>
            <StyledLink onClick={() => logout()}>
              <StyledCardContainerOut>
                <StyledCardIconContainer style={{ backgroundColor: "red" }}>
                  <StyledIconOut />
                </StyledCardIconContainer>
                <StyledContainerText>
                  <h3>Sair da conta</h3>
                </StyledContainerText>
              </StyledCardContainerOut>
            </StyledLink>
          </StyledContainerCards>
        </StyledSession>
      </StyledSessionsContainer>
    </>
  );
};

export default Config;
