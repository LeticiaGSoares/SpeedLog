import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";

const BotaoProximo = styled(Button)({
  position: "absolute",
  top: 750,
  left: 43,
  width: 275,
  height: 50,
  borderRadius: 30,
  backgroundColor: "#2cc295",
  fontWeight: "bold",
  fontFamily: "Montserrat, Helvetica",
  fontSize: 16,
  color: "white",
  textTransform: "none",
});

const ImagemEstilizada = styled("img")({
  position: "absolute",
  objectFit: "cover",
});

const TituloEstilizado = styled(Typography)(({ color }) => ({
  position: "absolute",
  fontWeight: "600",
  fontFamily: "Montserrat, Helvetica",
  color: color,
  transition: "color 0.3s ease",
}));

const EscolhaDePerfil = () => {
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const navigate = useNavigate();

  const selecionarPerfil = (perfil) => {
    setPerfilSelecionado(perfil === perfilSelecionado ? null : perfil);
  };

  const irParaProximo = () => {
    if (perfilSelecionado) {
      navigate(`/perfil/${perfilSelecionado.toLowerCase()}`);
    }
  };

  const voltarParaLogin = () => {
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" height="100vh" bgcolor="white">
      <Box
        position="relative"
        width="100%"
        maxWidth={360}
        height="100%"
        bgcolor="white"
        overflow="hidden"
      >
        <BotaoProximo
          variant="contained"
          onClick={irParaProximo}
          disabled={!perfilSelecionado}
        >
          PRÓXIMO
        </BotaoProximo>

        <TituloEstilizado
          variant="h6"
          color="#8f9799"
          sx={{ top: 90, left: 43 }}
        >
          Vamos começar!
        </TituloEstilizado>

        <TituloEstilizado
          variant="h6"
          color="#2cc295"
          sx={{ top: 123, left: 38, fontWeight: "bold" }}
        >
          Qual é o seu perfil?
        </TituloEstilizado>

        <Box
          sx={{
            position: "absolute",
            top: 65,
            left: 43,
            width: 274,
            height: 5,
            bgcolor: "#90909040",
            borderRadius: 40,
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 5,
              bgcolor: "#2cc295",
              borderRadius: 40,
            }}
          />
        </Box>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={7}
          sx={{
            position: "absolute",
            top: 240,
            left: 64,
            width: 240,
          }}
        >
          {["Cliente", "Motoboy"].map((perfil) => (
            <Grid item key={perfil} xs={12}>
              <Button
                onClick={() => selecionarPerfil(perfil)}
                sx={{ padding: 0, textTransform: "none", width: "100%" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    position: "relative",
                    width: 240,
                    height: 160,
                    bgcolor: perfilSelecionado === perfil ? "#d0f2e1" : "#ededed80",
                    borderRadius: 1,
                    border: "3px solid",
                    borderColor: perfilSelecionado === perfil ? "#2cc295" : "transparent",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <ImagemEstilizada
                    src="https://via.placeholder.com/130x120"
                    alt={`Imagem de ${perfil}`}
                    width={130}
                    height={120}
                    style={{ top: 13, left: 58 }}
                  />
                  <TituloEstilizado
                    variant="h6"
                    color={perfilSelecionado === perfil ? "#2cc295" : "#969e9f"}
                    sx={{ top: 170, left: perfil === "Cliente" ? 94 : 82 }}
                  >
                    {perfil}
                  </TituloEstilizado>
                </Paper>
              </Button>
            </Grid>
          ))}
        </Grid>

        <IconButton onClick={voltarParaLogin} sx={{ position: "absolute", top: 10, left: 43 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EscolhaDePerfil;
