import express from "express"
import conn from "./config/conn.js"
import routers from "./routes/routers.js"
import cors from "cors"
import "dotenv/config"

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("[APP] Servidor rodando na porta " + PORT);
    });
  })
  .catch((error) => {
    console.error("[APP] Error: " + error);
  });

app.use("/api", routers)

app.use("*", (req, res)=> {
    res.status(404).json({message: "Rota não encontrada"})
})