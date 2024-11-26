import formDataMiddleware from "./multer-form-body.js"
import validateBody from "./validate-body.js"

const indexEntregasGlobalHelpers = {
    validate: validateBody,
    formData: formDataMiddleware
}

export default indexEntregasGlobalHelpers