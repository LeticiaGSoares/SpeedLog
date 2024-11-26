import { Router } from "express";

const routers = Router()

import { router as routerUsuarios } from "./usuarios.js"
import { router as routerEntregas } from "./entregas.js";

routers.use("/usuario", routerUsuarios)
routers.use("/entregas", routerEntregas)

export default routers