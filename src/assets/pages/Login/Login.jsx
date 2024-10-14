import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Grid,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import speedlog from "../imgs/speedlog.png"; 
import loadingImage from "../imgs/loadingImage.png"; 

const BotaoAnimado = styled(Button)({
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#1f9e76',
    transform: 'scale(1.05)',
  },
});

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
});

const CaixaLogin = styled(Box)({
  width: '90%',
  maxWidth: 360,
  padding: '32px 24px',
  bgcolor: 'white',
  textAlign: 'center',
  borderRadius: '8px',
});

const ContainerImagem = styled(Box)({
  marginBottom: 24,
});

const ContainerFormulario = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

const estiloInput = {
  '& .MuiInput-underline:before': {
    borderBottomColor: '#ccc',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#02634D',
  },
  '& .MuiInput-input': {
    paddingLeft: '40px',
  },
  '& .MuiInputLabel-root': {
    transition: '0.3s ease',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#02634D',
  },
  '& .MuiInput-input:placeholder-shown + .MuiInputLabel-root': {
    color: '#ccc',
  },
  '& .MuiInput-input:focus + .MuiInputLabel-root': {
    color: '#02634D',
  },
};

const TelaCarregando = ({ loadingImage }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: '#2CC295',
      zIndex: 9999,
    }}
  >
    <img
      src={loadingImage}
      alt="Carregando"
      style={{
        width: '100%',
        maxWidth: '100%',
        marginBottom: 20,
      }}
    />
    <CircularProgress sx={{ color: 'white' }} />
  </Box>
);

const Login = () => {
  const [emailOuCpf, setEmailOuCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarDeMim, setLembrarDeMim] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMensagem, setSnackbarMensagem] = useState('');
  const [snackbarGravidade, setSnackbarGravidade] = useState('error');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (setter) => (event) => setter(event.target.value);
  
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validarEntrada = () => {
    if (!emailOuCpf || !senha) {
      return 'Por favor, preencha todos os campos.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const cpfRegex = /^\d{11}$/; 
    
    if (!emailRegex.test(emailOuCpf) && !cpfRegex.test(emailOuCpf)) {
      return 'Por favor, insira um e-mail válido ou um CPF com 11 dígitos.';
    }

    if (senha.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }

    return null;
  };

  const handleSubmit = () => {
    const mensagemErro = validarEntrada();
    if (mensagemErro) {
      setSnackbarMensagem(mensagemErro);
      setSnackbarGravidade('error');
      setSnackbarOpen(true);
      return;
    }

    console.log('Email ou CPF:', emailOuCpf, 'Senha:', senha, 'Lembrar-me:', lembrarDeMim);
    setEmailOuCpf('');
    setSenha('');

    setTimeout(() => {
      window.location.href = '/home';
      setSnackbarMensagem('Login bem-sucedido!');
      setSnackbarGravidade('success');
      setSnackbarOpen(true);
    }, 2000);
  };

  if (carregando) {
    return <TelaCarregando loadingImage={loadingImage} />;
  }

  return (
    <>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarGravidade} sx={{ width: '100%' }}>
          {snackbarMensagem}
        </Alert>
      </Snackbar>
      <Container>
        <CaixaLogin>
          <ContainerImagem>
            <img
              src={speedlog}
              alt="SpeedLog"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </ContainerImagem>
          <ContainerFormulario>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <PersonIcon sx={{ color: '#02634D', mt: 2 }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  variant="standard"
                  label="E-mail ou CPF"
                  sx={{ ...estiloInput, '& .MuiInputBase-input': { padding: '8px 0px' }}}
                  value={emailOuCpf}
                  onChange={handleInputChange(setEmailOuCpf)}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LockIcon sx={{ color: '#02634D', mt: 2 }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Senha"
                  placeholder="Digite sua senha"
                  sx={{ ...estiloInput, '& .MuiInputBase-input': { padding: '8px 0px' }}}
                  type="password"
                  value={senha}
                  onChange={handleInputChange(setSenha)}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={lembrarDeMim}
                  onChange={(event) => setLembrarDeMim(event.target.checked)}
                  color="primary"
                />
              }
              label="Lembre-se de mim"
              sx={{ margin: '8px 0' }}
            />
            <Link href="#" variant="body2" color="#145c46" fontWeight="bold">
              Esqueceu sua senha?
            </Link>
            <BotaoAnimado
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#2cc295",
                borderRadius: "30px",
                height: 48,
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={handleSubmit}
            >
              ENTRAR
            </BotaoAnimado>
            <Typography variant="body2" color="textSecondary">
              Não possui uma conta?{" "}
              <Link href="/escolha-de-perfil" color="#03624c" fontWeight="bold">
                Cadastre-se
              </Link>
            </Typography>
          </ContainerFormulario>
        </CaixaLogin>
      </Container>
    </>
  );
};

export default Login;
