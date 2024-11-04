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
import { getStates, getCities } from "@brazilian-utils/brazilian-utils";

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
const validarTelefone = (telefone) => /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
const validarNome = (nome) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(nome);
const validarDataNascimento = (data) => /^\d{4}-\d{2}-\d{2}$/.test(data);
const validarSenha = (senha) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{}|;:",.<>/?]).{8,}$/.test(
    senha
  );

const estadoInicial = {
  nome: "",
  sobrenome: "",
  genero: "",
  email: "",
  numero: "",
  dataNascimento: "",
  senha: "",
  confirmacaoSenha: "",
};

const redutor = (estado, acao) => {
  switch (acao.type) {
    case "SET_FIELD":
      return { ...estado, [acao.field]: acao.value };
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
  const [cidadesDisponiveis, setCidadesDisponiveis] = React.useState([]);
  const [estadosDisponiveis, setEstadosDisponiveis] = React.useState([]);

  useEffect(() => {
    const estadosInfo = getStates();
    setEstadosDisponiveis(estadosInfo);
  }, []);


  useEffect(() => {
    if (dadosFormulario.estado) {
      const novasCidades = getCities(dadosFormulario.estado);
      setCidadesDisponiveis(novasCidades || []);
      despachar({ type: "SET_FIELD", field: "cidade", value: "" });
    }
  }, [dadosFormulario.estado]);

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

    const dataNascimento = new Date(dadosFormulario.dataNascimento);
    const anoAtual = new Date().getFullYear();

    if (!dadosFormulario.nome || !dadosFormulario.sobrenome) {
      setSnackbarMessage("Por favor, preencha seu nome e sobrenome.");
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
      setSnackbarMessage(
        "Número de celular inválido. Deve estar no formato (99) 99999-9999."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validarSenha(dadosFormulario.senha)) {
      setSnackbarMessage(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um caractere especial."
      );
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

    
    if (dataNascimento.getFullYear() > anoAtual) {
      setSnackbarMessage(
        "O ano de nascimento não pode ser maior que o ano atual."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage("Cadastro realizado com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setTimeout(() => {
      navegar("/foto-cliente");
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
          onClick={() => navegar(-1)}
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
          marginTop={4}
          marginBottom={1}
        >
          2. Dados Básicos
        </Typography>
        <form onSubmit={lidarEnvio}>
          <Grid container spacing={1} marginTop={1}>
            {Object.keys(estadoInicial).map((field) => (
              <Grid item xs={12} sm={field === "genero" ? 12 : 6} key={field}>
                {field === "genero" ? (
                <>
                  <FormControl fullWidth variant="standard" margin="dense">
                    <InputLabel>Gênero</InputLabel>
                    <Select
                      name={field}
                      value={dadosFormulario[field]}
                      onChange={lidarMudancaCampo}
                      required
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Feminino">Feminino</MenuItem>
                      <MenuItem value="Outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="standard" margin="dense">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      name="estado"
                      value={dadosFormulario.estado}
                      onChange={lidarMudancaCampo}
                      required
                    >
                      {estadosDisponiveis.map((estado) => (
                        <MenuItem key={estado.code} value={estado.code}>
                          {estado.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="standard" margin="dense">
                    <InputLabel>Cidade</InputLabel>
                    <Select
                      name="cidade"
                      value={dadosFormulario.cidade}
                      onChange={lidarMudancaCampo}
                      required
                      disabled={!cidadesDisponiveis.length}
                    >
                      {cidadesDisponiveis.map((cidade) => (
                        <MenuItem key={cidade} value={cidade}>
                          {cidade}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                </>
                ) : (
                  <TextField
                    fullWidth
                    variant="standard"
                    label={
                      field === "dataNascimento"
                        ? ""
                        : field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, " $1")
                    }
                    name={field}
                    value={dadosFormulario[field]}
                    onChange={lidarMudancaCampo}
                    margin="dense"
                    type={
                      field === "dataNascimento"
                        ? "date"
                        : field === "senha" || field === "confirmacaoSenha"
                        ? "password"
                        : "text"
                    }
                    sx={estiloInput}
                    required
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="center" marginTop={3}>
            <NextButton type="submit">PRÓXIMO</NextButton>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

CadastroCliente.propTypes = {
  userRole: PropTypes.string,
};

export default CadastroCliente;
