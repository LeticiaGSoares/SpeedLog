import { Router } from "express"

export const router = Router()

import { indexControllersEntregas } from "../controllers/entregas/index.js"
import indexEntregasGlobalHelpers from "../helpers/entregas/index.js"

router.post(
    "/registrar/entrega",
    indexEntregasGlobalHelpers.formData,
    indexEntregasGlobalHelpers.validate,
    indexControllersEntregas.create
)