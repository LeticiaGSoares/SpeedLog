import createUsuario from "./createUsuario.js"
import decodeUsuario from "./decodeUsuario.js"
import deleteUsuario from "./deleteUsuario.js"
import loginUsuario from "./loginUsuario.js"
import logoutUsuario from "./logoutUsuario.js"
import searchUsuario from "./searchUsuario.js"
import updateUsuario from "./updateUsuario.js"

export const indexControllersUsuarios = {
    create: createUsuario,
    delete: deleteUsuario,
    update: updateUsuario,
    search: searchUsuario,
    login: loginUsuario,
    logout: logoutUsuario,
    decode: decodeUsuario
}