import authTokenBody from "./auth-token-body.js"
import validateBody from "./auth-token-body.js"
import authToken from "./auth-token.js"

export const indexHelpersAdministradores = {
    validate: validateBody,
    authWithoutBody: authToken,
    auth: authTokenBody
}