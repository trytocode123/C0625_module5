import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import HeaderComponent from "./component/HeaderComponent.jsx";
import RoomListComponent from "./component/RoomListComponent.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import VillaListComponent from "./component/VillaListComponent.jsx";
import HouseListComponent from "./component/HouseListComponent.jsx";
import HomeComponent from "./component/HomeComponent.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={"/rooms/:searchName?"} element={<RoomListComponent/>}/>
                <Route path={"/villas/:searchName?"} element={<VillaListComponent/>}/>
                <Route path={"/houses/:searchName?"} element={<HouseListComponent/>}/>
                <Route path={"/"} element={<HomeComponent/>}/>

            </Routes>

        </>
    )
}

export default App
