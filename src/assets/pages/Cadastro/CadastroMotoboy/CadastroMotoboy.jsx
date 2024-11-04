import React, { useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import InputMask from "react-input-mask"; // Mantivemos para formatar o celular
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Container = styled(Box)( {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const FormContainer = styled(Box)( {
  width: "100%",
  maxWidth: 400,
  padding: "24px",
});

const NextButton = styled(Button)( {
  width: 275,
  height: 50,
  borderRadius: 30,
  backgroundColor: "#2cc295",
  fontWeight: "bold",
  fontFamily: "Montserrat, Helvetica",
  fontSize: 16,
  color: "white",
  marginLeft: "25px",
  marginTop: "25px",
  textTransform: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
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

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validarSenha = (senha) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(senha);

const estadoInicial = {
  nome: "",
  email: "",
  senha: "",
  confirmacaoSenha: "",
  celular: "",
  dataNascimento: "",
};

const redutor = (estado, acao) => {
  switch (acao.type) {
    case "SET_FIELD":
      return { ...estado, [acao.field]: acao.value };
    default:
      return estado;
  }
};

const CadastroMotoboy = () => {
  const navegar = useNavigate();
  const [dadosFormulario, despachar] = useReducer(redutor, estadoInicial);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [progresso, setProgresso] = React.useState("50%");

  useEffect(() => {
    const todosCamposPreenchidos = Object.values(dadosFormulario).every(
      (value) => value.trim() !== ""
    );
    setProgresso(todosCamposPreenchidos ? "75%" : "50%");
  }, [dadosFormulario]);

  const lidarMudancaCampo = (e) => {
    const { name, value } = e.target;
    despachar({ type: "SET_FIELD", field: name, value });
  };

  const lidarEnvio = (e) => {
    e.preventDefault();

    if (!dadosFormulario.nome) {
      setSnackbarMessage("Por favor, preencha seu nome.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validarEmail(dadosFormulario.email)) {
      setSnackbarMessage("E-mail inválido.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validarSenha(dadosFormulario.senha)) {
      setSnackbarMessage("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um caractere especial.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (dadosFormulario.senha !== dadosFormulario.confirmacaoSenha) {
      setSnackbarMessage("As senhas não coincidem.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const dataNascimento = new Date(dadosFormulario.dataNascimento);
    const anoAtual = new Date().getFullYear();
    if (dataNascimento.getFullYear() > anoAtual) {
      setSnackbarMessage("O ano de nascimento não pode ser maior que o ano atual.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }


    setTimeout(() => {
      navegar("/dados-moto");
    }, 2000);
  };

  const lidarFecharSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={lidarFecharSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={lidarFecharSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <FormContainer>
        <IconButton onClick={() => navegar("/escolha-de-perfil")} style={{ position: "absolute", top: 11, left: 11 }}>
          <ArrowBackIcon />
        </IconButton>
        <BarraDeProgresso largura={progresso} cor="#2cc295" />
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          color="black"
          marginTop={-20}
          paddingLeft={3}
          marginBottom={1}
        >
          2. Dados Básicos
        </Typography>
        <form onSubmit={lidarEnvio}>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Nome"
                name="nome"
                value={dadosFormulario.nome}
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
                label="E-mail"
                name="email"
                value={dadosFormulario.email}
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
                label="Celular"
                name="celular"
                value={dadosFormulario.celular}
                onChange={lidarMudancaCampo}
                margin="dense"
                sx={estiloInput}
                required
                InputProps={{
                  inputComponent: InputMask,
                  inputProps: {
                    mask: "(99) 99999-9999", 
                    maskChar: null,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Senha"
                name="senha"
                type="password"
                value={dadosFormulario.senha}
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
                label="Confirmação de Senha"
                name="confirmacaoSenha"
                type="password"
                value={dadosFormulario.confirmacaoSenha}
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
                label=""
                name="dataNascimento"
                value={dadosFormulario.dataNascimento}
                onChange={lidarMudancaCampo}
                margin="dense"
                type="date"
                sx={estiloInput}
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <NextButton type="submit">PRÓXIMO</NextButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

CadastroMotoboy.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  celular: PropTypes.string.isRequired,
  senha: PropTypes.string.isRequired,
  confirmacaoSenha: PropTypes.string.isRequired,
  dataNascimento: PropTypes.string.isRequired,
};

export default CadastroMotoboy;
