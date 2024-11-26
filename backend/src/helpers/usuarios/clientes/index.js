import authToken from "./auth-token.js"
import validateBody from "./validate-body.js"

export const indexHelpersClientes = {
    validate: validateBody,
    auth: authToken
}