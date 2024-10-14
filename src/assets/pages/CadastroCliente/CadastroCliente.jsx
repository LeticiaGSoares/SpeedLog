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
  textTransform: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const BarraDeProgresso = styled(Box)( ({ largura = "0%", cor = "#2cc295" }) => ({
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
  sobrenome: "",
  cpf: "",
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

  useEffect(() => {
    const todosCamposPreenchidos = Object.values(dadosFormulario).every((value) => value.trim() !== "");
    setProgresso(todosCamposPreenchidos ? "75%" : "50%");
  }, [dadosFormulario]);

  const lidarMudancaCampo = (e) => {
    const { name, value } = e.target;
    despachar({ type: "SET_FIELD", field: name, value });
  };

  const lidarEnvio = (e) => {
    e.preventDefault();

    if (!dadosFormulario.nome || !dadosFormulario.sobrenome) {
      setSnackbarMessage("Por favor, preencha seu nome e sobrenome.");
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

    if (dadosFormulario.senha !== dadosFormulario.confirmacaoSenha) {
      setSnackbarMessage("As senhas não coincidem.");
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
          2. Dados básicos
        </Typography>
        <form onSubmit={lidarEnvio}>
          <Grid container spacing={1} marginTop={1}>
            {Object.keys(estadoInicial).map((field) => (
              <Grid item xs={12} sm={field === "genero" ? 12 : 6} key={field}>
                {field === "cpf" || field === "numero" ? (
                  <InputMask
                    mask={field === "cpf" ? "999.999.999-99" : "(99) 99999-9999"}
                    value={dadosFormulario[field]}
                    onChange={lidarMudancaCampo}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        variant="standard"
                        label={field === "cpf" ? "CPF" : "Número Celular"}
                        name={field}
                        margin="dense"
                        sx={estiloInput}
                        required
                      />
                    )}
                  </InputMask>
                ) : field === "genero" ? (
                  <FormControl fullWidth variant="standard" margin="dense">
                    <InputLabel>Gênero</InputLabel>
                    <Select
                      name={field}
                      value={dadosFormulario[field]}
                      onChange={lidarMudancaCampo}
                      required
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Feminino">Feminino</MenuItem>
                      <MenuItem value="Prefiro não dizer">Prefiro não dizer</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    variant="standard"
                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={field}
                    type={field.includes("senha") ? "password" : field === "dataNascimento" ? "date" : "text"}
                    value={dadosFormulario[field]}
                    onChange={lidarMudancaCampo}
                    margin="dense"
                    sx={estiloInput}
                    required
                    InputLabelProps={field === "dataNascimento" ? { shrink: true } : {}}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12} marginTop={2}>
              <NextButton type="submit">PRÓXIMO</NextButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={lidarFecharSnackbar}>
        <Alert onClose={lidarFecharSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

CadastroCliente.propTypes = {
  navegar: PropTypes.func.isRequired,
};

export default CadastroCliente;