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

const StyledLink = styled("a")`
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
            <ListItemButton>
              <StyledListItemIcon>
                <HomeIcon />
                <StyledLink href="/inicio">
                  <ListItemText secondary="Home" />
                </StyledLink>
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton>
              <StyledListItemIcon>
                <HistoryIcon />
                <StyledLink href="/historico">
                  <ListItemText secondary="Histórico" />
                </StyledLink>
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton>
              <StyledListItemIcon>
                <SettingsIcon />
                <StyledLink href="/configuracoes">
                  <ListItemText secondary="Config." />
                </StyledLink>
              </StyledListItemIcon>
            </ListItemButton>
          </StyledListItem>
        </StyledList>
      </nav>
    </Box>
  );
};

export default Navbar;
