import styled from "styled-components";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

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

const StyledProfileContainer = styled.div`
  display: flex;
  width: 100%;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledProfileContanierInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledProfileContainerIcon = styled.div`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
`

const EditProfile = () => {
  return (
    <>
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
            </StyledProfileContanierInfo>
          </StyledProfileContainer>
        </StyledSession>
    </>
  )
}

export default EditProfile