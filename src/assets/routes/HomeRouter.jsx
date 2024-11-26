import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home'; 
import Entrega from '../pages/Home/Entrega';

const HomeRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path='/entrega' element={<Entrega/>}/>
        </Routes>
    )
}

export default HomeRouter