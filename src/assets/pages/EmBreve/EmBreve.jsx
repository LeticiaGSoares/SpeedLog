import { Link } from "react-router-dom"

const EmBreve = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100%', 
            display:'flex', 
            justifyContent:'center', 
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1 style={{color: '#2BE88B'}}>Em breve</h1>
            <Link to={"/home"}>Início</Link>
        </div>
    )
}

export default EmBreve