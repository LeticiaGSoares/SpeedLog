import React, { useReducer, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const FormContainer = styled(Box)({
  width: "100%",
  maxWidth: 400,
  padding: "24px",
});

const NextButton = styled(Button)({
  width: 275,
  height: 50,
  borderRadius: 30,
  backgroundColor: "#2cc295",
  fontWeight: "bold",
  fontFamily: "Montserrat, Helvetica",
  fontSize: 16,
  color: "white",
  marginTop: "25px",
  textTransform: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const UploadButton = styled(Button)({
  width: "100%",
  borderRadius: 30,
  backgroundColor: "#2cc295",
  fontWeight: "bold",
  color: "white",
  marginTop: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#28b388",
  },
});

const UploadArea = styled(Box)({
  border: "2px dashed #ccc",
  borderRadius: 8,
  padding: "20px",
  textAlign: "center",
  marginTop: "10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const BarraDeProgresso = styled(Box)(({ largura = "0%", cor = "#2cc295" }) => ({
  position: "absolute",
  top: 50,
  left: "50%",
  transform: "translateX(-50%)",
  width: "70%",
  height: 6,
  bgcolor: "#90909040",
  border: "2px solid #b5c0bd",
  borderRadius: 40,
  overflow: "hidden",
  "&::before": {
    content: '""',
    display: "block",
    height: "100%",
    backgroundColor: cor,
    borderRadius: 40,
    width: largura,
    transition: "width 0.3s ease",
  },
}));

const estiloInput = {
  "& .MuiInput-underline:before": {
    borderBottomColor: "#ccc",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#02634D",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#02634D",
  },
};

const estadoInicial = {
  placa: "",
  modelo: "",
  fotoMoto: null,
  previewFoto: null,
};

const redutor = (estado, acao) => {
  switch (acao.type) {
    case "SET_FIELD":
      return { ...estado, [acao.field]: acao.value };
    case "SET_FILE":
      return { ...estado, fotoMoto: acao.file, previewFoto: acao.preview };
    default:
      return estado;
  }
};

const DetalhesMoto = () => {
  const navegar = useNavigate();
  const [dadosFormulario, despachar] = useReducer(redutor, estadoInicial);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [progresso, setProgresso] = useState("75%");
  const [loading, setLoading] = useState(false);

  const lidarMudancaCampo = (e) => {
    const { name, value } = e.target;
    despachar({ type: "SET_FIELD", field: name, value });
  };

  const lidarEnvio = (e) => {
    e.preventDefault();
  
    if (!dadosFormulario.placa) {
      setSnackbarMessage("Por favor, preencha a placa.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (!dadosFormulario.modelo) {
      setSnackbarMessage("Por favor, preencha o modelo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (!dadosFormulario.fotoMoto) {
      setSnackbarMessage("Por favor, carregue uma foto da moto.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setProgresso("100%");
    
    setLoading(true);
    setTimeout(() => {
      setSnackbarMessage("Dados da moto cadastrados com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setLoading(false);
  
      setTimeout(() => {
        navegar("/pagina-inicial");
      }, 2000);
    }, 1500);
  };

  const lidarFecharSnackbar = () => {
    setSnackbarOpen(false);
  };

  const lidarMudancaArquivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setSnackbarMessage("Apenas imagens são permitidas.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setSnackbarMessage("O arquivo deve ter no máximo 2MB.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        despachar({ type: "SET_FILE", file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const lidarArrastar = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const file = e.dataTransfer.items[0].getAsFile();
      if (file) lidarMudancaArquivo({ target: { files: [file] } });
    }
  };

  return (
    <Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={lidarFecharSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={lidarFecharSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <FormContainer>
        <IconButton
          onClick={() => navegar("/cadastro-motoboy")}
          style={{ position: "absolute", top: 11, left: 11 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <BarraDeProgresso largura={progresso} cor="#2cc295" />
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          color="black"
          paddingLeft={3}
          marginTop={-32}
          marginBottom={1}
        >
          3. Dados da Moto
        </Typography>
        <form onSubmit={lidarEnvio}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Placa"
                name="placa"
                value={dadosFormulario.placa}
                onChange={lidarMudancaCampo}
                margin="dense"
                sx={estiloInput}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Modelo"
                name="modelo"
                value={dadosFormulario.modelo}
                onChange={lidarMudancaCampo}
                margin="dense"
                sx={estiloInput}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <UploadArea
                onDragOver={(e) => e.preventDefault()}
                onDrop={lidarArrastar}
              >
                <InputLabel>
                  Arraste e solte a foto da moto ou clique abaixo
                </InputLabel>
                <UploadButton variant="contained" component="label">
                  Selecionar Foto
                  <input
                    type="file"
                    onChange={lidarMudancaArquivo}
                    accept="image/*"
                    hidden
                  />
                </UploadButton>
              </UploadArea>
            </Grid>
            {dadosFormulario.previewFoto && (
              <Grid item xs={12} display="flex" justifyContent="center">
                <img
                  src={dadosFormulario.previewFoto}
                  alt="Pré-visualização"
                  style={{ maxWidth: "100%", borderRadius: 8, marginTop: 10 }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            marginTop={1}
          >
            <NextButton type="submit" variant="contained" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "CADASTRAR"
              )}
            </NextButton>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

DetalhesMoto.propTypes = {
  photo: PropTypes.string,
};

export default DetalhesMoto;
