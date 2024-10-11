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

const AnimatedButton = styled(Button)({
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

const LoginBox = styled(Box)({
  width: '90%',
  maxWidth: 360,
  padding: '32px 24px',
  bgcolor: 'white',
  textAlign: 'center',
  borderRadius: '8px',
});

const ImageContainer = styled(Box)({
  marginBottom: 24,
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

const inputStyle = {
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

const LoadingScreen = ({ loadingImage }) => (
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
      alt="Loading"
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
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (setter) => (event) => setter(event.target.value);
  
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validateInput = () => {
    if (!emailOrCpf || !password) {
      return 'Por favor, preencha todos os campos.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const cpfRegex = /^\d{11}$/; 
    
    if (!emailRegex.test(emailOrCpf) && !cpfRegex.test(emailOrCpf)) {
      return 'Por favor, insira um e-mail válido ou um CPF com 11 dígitos.';
    }

    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }

    return null;
  };

  const handleSubmit = () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    console.log('Email ou CPF:', emailOrCpf, 'Senha:', password, 'Lembrar-me:', rememberMe);
    setEmailOrCpf('');
    setPassword('');

    setTimeout(() => {
      window.location.href = '/home';
      setSnackbarMessage('Login bem-sucedido!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }, 2000);
  };

  if (loading) {
    return <LoadingScreen loadingImage={loadingImage} />;
  }

  return (
    <>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container>
        <LoginBox>
          <ImageContainer>
            <img
              src={speedlog}
              alt="SpeedLog"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </ImageContainer>
          <FormContainer>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <PersonIcon sx={{ color: '#02634D', mt: 2 }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  variant="standard"
                  label="E-mail ou CPF"
                  sx={{ ...inputStyle, '& .MuiInputBase-input': { padding: '8px 0px' }}}
                  value={emailOrCpf}
                  onChange={handleInputChange(setEmailOrCpf)}
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
                  sx={{ ...inputStyle, '& .MuiInputBase-input': { padding: '8px 0px' }}}
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  color="primary"
                />
              }
              label="Lembre-se de mim"
              sx={{ margin: '8px 0' }}
            />
            <Link href="#" variant="body2" color="#145c46" fontWeight="bold">
              Esqueceu sua senha?
            </Link>
            <AnimatedButton
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
            </AnimatedButton>
            <Typography variant="body2" color="textSecondary">
              Não possui uma conta?{" "}
              <Link href="/register" color="#03624c" fontWeight="bold">
                Cadastre-se
              </Link>
            </Typography>
          </FormContainer>
        </LoginBox>
      </Container>
    </>
  );
};

export default Login;
