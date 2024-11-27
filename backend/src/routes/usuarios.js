import { Router } from "express"

export const router = Router()

import { indexControllersUsuarios } from "../controllers/usuarios/index.js"
import { indexHelpersClientes } from "../helpers/usuarios/clientes/index.js"
import { indexHelpersAdministradores } from "../helpers/usuarios/administradores/index.js"
import { indexHelpersMotoboys } from "../helpers/usuarios/motoboys/index.js"
import indexUsuariosGlobalHelpers from "../helpers/usuarios/index.js"

router.post(
    "/decode",
    indexControllersUsuarios.decode
)

router.post(
    "/registrar/cliente",
    indexHelpersClientes.validate,
    indexControllersUsuarios.create
)

router.post(
    "/registrar/motoboy",
    indexHelpersMotoboys.validate,
    indexControllersUsuarios.create
)

router.post(
    "/registrar/admin",
    indexHelpersAdministradores.auth,
    indexHelpersAdministradores.validate,
    indexControllersUsuarios.create
)

router.post(
    "/registrar/admin",
    indexHelpersAdministradores.auth,
    indexHelpersAdministradores.validate,
    indexControllersUsuarios.create
)

router.delete(
    "/deletar/:id",
    indexHelpersAdministradores.authWithoutBody,
    indexControllersUsuarios.delete
)

router.get(
    "/pesquisar/:id",
    indexControllersUsuarios.search
)

router.put(
    "/atualizar/:id",
    indexControllersUsuarios.update
)

router.get(
    "/logout",
    indexUsuariosGlobalHelpers.auth,
    indexControllersUsuarios.logout
)
   
router.get(
    "/",
    indexHelpersAdministradores.authWithoutBody,
    indexControllersUsuarios.search
)   

router.post(
    "/login",
    indexUsuariosGlobalHelpers.validateBodyLogin,
    indexControllersUsuarios.login
)