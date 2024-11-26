const returnRes = (msg, status, res) => {
    if (!res || !status) {
        return msg
    }

    if (status == 500 || status == 404) {
        return res.status(status).send({ error: msg })
    }

    return res.status(status).send({ message: msg })
}

export default returnRes