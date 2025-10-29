import {Routes, Route} from 'react-router-dom';
import {Home} from "../pages/Home/Home";
import { Teachers} from '../pages/Teachers/Teachers';
import {Favorites} from '../pages/Favorites/Favorites';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="/teachers" element={<Teachers />}/>
            <Route path="/" element={<Favorites />}/>
        </Routes>
    )
}