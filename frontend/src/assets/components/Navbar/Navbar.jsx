import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

import theme from "../../theme";
import styled from "styled-components";

const StyledList = styled(List)`
  display: flex;
  flex-direction: row;
  padding: 0;
  background-color: ${theme.colors.greenRegular}; // Cor de fundo
`;

const StyledListItem = styled(ListItem)`
  &:active {
    p,
    svg {
      color: white;
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  flex-direction: column;
`;

const Navbar = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: theme.colors.greenRegular }}>
      <nav aria-label="main mailbox folders">
        <StyledList disablePadding>
          <StyledListItem disablePadding>
            <ListItemButton to="/home">
              <StyledListItemIcon>
                <HomeIcon />
                <ListItemText secondary="Home" />
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton to="/historico">
              <StyledListItemIcon>
                <HistoryIcon />
                <ListItemText secondary="Histórico" />
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton to="/config">
              <StyledListItemIcon>
                <SettingsIcon />
                <ListItemText secondary="Config." />
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
        </StyledList>
      </nav>
    </Box>
  );
};

export default Navbar;