import styled from "styled-components";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useEffect, useState } from "react";
import axios from "axios";

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

const StyledSaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #2BE88B;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #25b86e;
  }
`;

const StyledInputContainer = styled.div`
  font-size: 16px;
  border-bottom: 2px solid #00000092;
  
  input {
    width: 99%;
    font-size: 17px;
    border: none;

    &:focus {
      outline: none;
    }
  }
`

const ViewProfile = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [ userData, setUserData ] = useState([])
  const idUsuario = localStorage.getItem("usuario_id")
  const [telefone, setTelefone] = useState(userData.telefone)
  const [cidade, setCidade] = useState(userData.cidade)

  console.log(telefone, cidade)

  const getInfoUserAxios = async () => {
    await axios.get(`http://localhost:3333/api/usuario/pesquisar/${idUsuario}`).then((response) => setUserData(response.data.message))
  }

  useEffect(() => {
    getInfoUserAxios()
  }, [])

  const updateInfo = async () => {
    await axios.put(`http://localhost:3333/api/usuario/atualizar/${idUsuario}`, {
      telefone: telefone,
      cidade: cidade
    }).then((response) => window.location.reload())
  }

  return (
    <>
      <StyledSessionsContainer>
        <StyledSession>
          <StyledProfileContainer>
            <StyledProfileContanierButtons>
              <StyledIconArrowBack
                onClick={() => window.location.href = "/config/"}
              />
              <StyledIconPencil
                onClick={() => setShowEdit(!showEdit)}
              />
            </StyledProfileContanierButtons>
            <StyledProfileContanierInfo>
              <StyledProfileContainerIcon>
                <StyledIconProfile />
              </StyledProfileContainerIcon>
              <StyledProfileContainerName>
                <h1>{userData.nome}</h1>
              </StyledProfileContainerName>
              <StyledProfileContainerAdditionalInfo>
                <StyledProfileContainerInfo>
                  <h1>30</h1>
                  <h2 style={{ fontWeight: "400" }}>Pedidos</h2>
                </StyledProfileContainerInfo>
                <StyledProfileContainerInfo>
                  <h1>{userData.avaliacao}</h1>
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
            {
              showEdit ?
                (<>
                  <StyledInfoViewContainer>
                    <label>Email</label>
                    <StyledInputContainer>
                      <input type="email" value={userData.email} disabled />
                    </StyledInputContainer>
                  </StyledInfoViewContainer>
                  <StyledInfoViewContainer>
                    <label>Número</label>
                    <StyledInputContainer>
                      <input type="tel" onChange={(e) => setTelefone(e.target.value)} defaultValue={userData.telefone} />
                    </StyledInputContainer>
                  </StyledInfoViewContainer>
                  <StyledInfoViewContainer>
                    <label>Cidade</label>
                    <StyledInputContainer>
                      <input type="text" onChange={(e) => setCidade(e.target.value)} defaultValue={userData.cidade} />
                    </StyledInputContainer>
                  </StyledInfoViewContainer>
                  <StyledInfoViewContainer>
                    <label>Data de nascimento</label>
                    <StyledInputContainer>
                      <input type="date" value={userData.data_nascimento} disabled />
                    </StyledInputContainer>
                  </StyledInfoViewContainer>
                  <StyledSaveButton onClick={() => updateInfo()}>
                    Salvar
                  </StyledSaveButton>
                </>) : (
                  <>
                    <StyledInfoViewContainer>
                      <label>Email</label>
                      <h3>{userData.email}</h3>
                    </StyledInfoViewContainer>
                    <StyledInfoViewContainer>
                      <label>Número</label>
                      <h3>{userData.telefone}</h3>
                    </StyledInfoViewContainer>
                    <StyledInfoViewContainer>
                      <label>Cidade</label>
                      <h3>{userData.cidade}</h3>
                    </StyledInfoViewContainer>
                    <StyledInfoViewContainer>
                      <label>Data de nascimento</label>
                      <h3>{userData.data_nascimento}</h3>
                    </StyledInfoViewContainer>
                  </>
                )

            }
          </StyledAllInfosView>
        </StyledSession>
      </StyledSessionsContainer>

    </>
  )
}

export default ViewProfile