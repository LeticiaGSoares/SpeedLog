import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  styled,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

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

const Container = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: '16px', // Padding para dispositivos móveis
}));

const FormContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: 400,
  padding: "24px",
  position: "relative",
}));

const NextButton = styled(Button)(() => ({
  width: "100%", // Ajuste para que o botão ocupe 100% do container
  height: 50,
  borderRadius: 30,
  backgroundColor: "#2cc295",
  fontWeight: "bold",
  fontFamily: "Montserrat, Helvetica",
  fontSize: 16,
  color: "white",
  marginTop: "20px",
  textTransform: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CircularImageUpload = styled(Avatar)(({ src }) => ({
  width: 250,
  height: 250,
  margin: "auto",
  border: "2px solid #2cc295",
  backgroundColor: src ? "transparent" : "#f0f0f0",
  position: "relative",
  borderRadius: "50%",
}));

const HiddenInput = styled("input")({
  display: "none",
});

const getCroppedImg = (imageSrc, pixelCrop) => {
  const image = document.createElement("img");
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = "croppedImage.jpeg";
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};

const CadastroFotoCliente = () => {
  const navegar = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [foto, setFoto] = useState(null);
  const [progresso, setProgresso] = useState("100%");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [image, setImage] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const lidarEnvio = async (e) => {
    e.preventDefault();
    if (!image) {
      setSnackbarMessage("Por favor, selecione uma foto.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
    console.log(croppedImageUrl);
    setSnackbarMessage("Foto enviada com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setTimeout(() => {
      navegar("/home");
    }, 2000);
  };

  const lidarMudancaFoto = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setCropperVisible(true);
      };
      reader.readAsDataURL(arquivo);
    }
  };

  const lidarFecharSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onCropComplete = (crop) => {
    setCroppedAreaPixels(crop);
  };
  const handleCropConfirm = async () => {
    if (croppedAreaPixels) {
      const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
      setFoto(croppedImageUrl);
      setCropperVisible(false);
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
          onClick={() => navegar(-1)}
          style={{ position: "absolute", top: 10, left: 11 }}
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
          marginTop={5}
          marginBottom={2}
        >
          3. Adicionar Foto de Perfil
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" marginBottom={2}>
          Selecione uma foto de perfil adequada. Você pode cortá-la após o upload.
        </Typography>

        {cropperVisible ? (
          <Box style={{ position: "relative", height: "300px", width: "100%" }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropComplete={(crop, pixels) => {
                onCropComplete(pixels);
              }}
              onCropChange={(newCrop) => setCrop(newCrop)}
              onZoomChange={(newZoom) => setZoom(newZoom)}
              style={{ containerStyle: { height: "100%", width: "100%" } }}
            />
            <Button variant="contained" onClick={handleCropConfirm} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
              Confirmar
            </Button>
          </Box>
        ) : (
          <Grid container justifyContent="center" marginTop={2}>
            <label htmlFor="upload-button-file">
              <CircularImageUpload
                src={foto}
                alt="Foto de perfil"
                component="span"
              />
              <HiddenInput
                accept="image/*"
                id="upload-button-file"
                type="file"
                onChange={lidarMudancaFoto}
              />
            </label>
          </Grid>
        )}
        <Grid container justifyContent="center" marginTop={2}>
          <NextButton type="submit" onClick={lidarEnvio}>
            PRÓXIMO
          </NextButton>
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default CadastroFotoCliente;
