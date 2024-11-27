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
import MaskedInput from 'react-text-mask';
import axios from "axios";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const NextButton = styled(Button)({
  width: "100%",
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

const baseURL = `http://localhost:3333/api/usuario/registrar/motoboy`

const DetalhesMoto = () => {
  const navegar = useNavigate();
  const [dadosFormulario, despachar] = useReducer(redutor, estadoInicial);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [progresso, setProgresso] = useState("75%");
  const [loading, setLoading] = useState(false);
  const dataForms = JSON.parse(localStorage.getItem("motoboy_data"))

  console.log(dataForms)

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
    setProgresso("100%");

    setLoading(true);
    setTimeout(() => {
      axios.post(baseURL, {
        nome: dataForms.nome,
        email: dataForms.email,
        papel: "motoboy",
        senha: dataForms.senha,
        data_nascimento: dataForms.dataNascimento,
        telefone: dadosFormulario.numero,
        confirmarSenha: dadosFormulario.confirmacaoSenha,
        moto_placa: dadosFormulario.placa,
        moto_modelo: dadosFormulario.modelo
      }).then((response) => {
        axios.post("http://localhost:3333/api/usuario/decode", {
          token: response.data.message
        }).then(((responseToken) => {
          if (!response.data.error) {
            localStorage.setItem("token", response.data.message)
            localStorage.setItem("usuario_id", JSON.stringify(responseToken.data.message.id))
            setSnackbarMessage("Conta motoboy criada com sucesso!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            localStorage.setItem("motoboy_data", null)
            navegar("/home");
          }
        })
        )
      })
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

  const mascaraPlaca = [
    /[A-Z]/,
    /[A-Z]/,
    /[A-Z]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];

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
          marginTop={2}
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
                InputProps={{
                  inputComponent: MaskedInput,
                  inputProps: {
                    mask: mascaraPlaca,
                    placeholder: 'AAA-0000',
                  },
                }}
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

            {dadosFormulario.previewFoto && (
              <Grid item xs={12} display="flex" justifyContent="center">
                <img
                  src={dadosFormulario.previewFoto}
                  alt="Pré-visualização"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: 8,
                    marginTop: 10,
                    objectFit: "contain",
                  }}
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
