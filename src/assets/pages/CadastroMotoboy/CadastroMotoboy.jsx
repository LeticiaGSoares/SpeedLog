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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import InputMask from "react-input-mask";
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

const validarCPF = (cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validarTelefone = (telefone) => /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);

const estadoInicial = {
  nome: "",
  cpf: "",
  email: "",
  numero: "",
  dataNascimento: "",
  cnh: "",
  placa: "",
  modelo: "",
  fotoMoto: null, // Para a foto da moto
};

const redutor = (estado, acao) => {
  switch (acao.type) {
    case "SET_FIELD":
      return { ...estado, [acao.field]: acao.value };
    case "SET_FILE":
      return { ...estado, fotoMoto: acao.file };
    default:
      return estado;
  }
};

const CadastroCliente = () => {
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
  
    // Validações dos campos
    if (!dadosFormulario.nome) {
      setSnackbarMessage("Por favor, preencha seu nome.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (!validarCPF(dadosFormulario.cpf)) {
      setSnackbarMessage("CPF inválido. Deve estar no formato XXX.XXX.XXX-XX.");
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
  
    if (!validarTelefone(dadosFormulario.numero)) {
      setSnackbarMessage("Número de celular inválido. Deve estar no formato (99) 99999-9999.");
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
  
    // Se todas as validações passaram, navegue para a próxima página
    setSnackbarMessage("Cadastro realizado com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    
    // Navegue para a próxima página apenas aqui, após todas as validações
    setTimeout(() => {
      navegar("/foto-cliente");
    }, 2000);
  };

  const lidarFecharSnackbar = () => {
    setSnackbarOpen(false);
  };

  const lidarMudancaArquivo = (e) => {
    despachar({ type: "SET_FILE", file: e.target.files[0] });
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
        <IconButton onClick={() => navegar(-1)} style={{ position: "absolute", top: 11, left: 11 }}>
          <ArrowBackIcon />
        </IconButton>
        <BarraDeProgresso largura={progresso} cor="#2cc295" />
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          color="black"
          paddingLeft={3}
          marginTop={4}
          marginBottom={1}
        >
          2. Dados Básicos
        </Typography>
        <form onSubmit={lidarEnvio}>
          <Grid container spacing={1} marginTop={1}>
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
              <InputMask
                mask="999.999.999-99"
                value={dadosFormulario.cpf}
                onChange={lidarMudancaCampo}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    variant="standard"
                    label="CPF"
                    name="cpf"
                    margin="dense"
                    sx={estiloInput}
                    required
                  />
                )}
              </InputMask>
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
              <InputMask
                mask="(99) 99999-9999"
                value={dadosFormulario.numero}
                onChange={lidarMudancaCampo}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    variant="standard"
                    label="Número"
                    name="numero"
                    margin="dense"
                    sx={estiloInput}
                    required
                  />
                )}
              </InputMask>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="CNH"
                name="cnh"
                value={dadosFormulario.cnh}
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
              <InputLabel id="foto-moto-label">Foto da Moto</InputLabel>
              <input type="file" onChange={lidarMudancaArquivo} />
            </Grid>
            <Grid item xs={12}>
              <NextButton variant="contained" type="submit">
                PRÓXIMO
              </NextButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

CadastroCliente.propTypes = {
  history: PropTypes.object,
};

export default CadastroCliente;
