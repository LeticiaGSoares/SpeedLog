import upload from "./upload-public.js"
import createToken from "./create-token.js"
import authToken from "./auth-token.js"
import validateBodyUpdate from "./validate-body-update.js"
import validateBodyLogin from "./validate-body-login.js"
import formDataMiddleware from "./multer-form-body.js"

const indexUsuariosGlobalHelpers = {
    upload: upload,
    createToken: createToken,
    auth: authToken,
    validateBodyUpdate: validateBodyUpdate,
    validateBodyLogin: validateBodyLogin,
    multerFormBody: formDataMiddleware
}

export default indexUsuariosGlobalHelpers