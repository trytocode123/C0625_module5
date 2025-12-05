import './App.css'
import {Route, Routes} from "react-router-dom";
import AddComponent from "./component/AddComponent.jsx";
import HomeComponent from "./component/HomeComponent.jsx";
import HeaderComponent from "./component/HeaderComponent.jsx";
import ListComponent from "./component/ListComponent.jsx";
import DetailComponent from "./component/DetailComponent.jsx";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={"/home"} element={<HomeComponent/>}/>
                <Route path={"/players/:searchName?"} element={<ListComponent/>}/>
                <Route path={"/players/add"} element={<AddComponent/>}/>
                <Route path={"/players/detail/:id"} element={<DetailComponent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
