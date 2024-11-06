import React from "react"
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <h1>Home</h1>
            <Link to={"/entrega"}>Enviar item</Link>
            <Link to={"/entrega"}>Receber item</Link>
        </>
    )
}

export default Home