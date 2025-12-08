import './App.css'
import ListComponent from "./component/ListComponent.jsx";
import {ToastContainer} from "react-toastify";
import {Routes} from "react-router-dom";
import {Route} from "react-router";
import DetailComponent from "./component/DetailComponent.jsx";
import HeaderComponent from "./component/HeaderComponent.jsx";
import HomeComponent from "./component/HomeComponent.jsx";
import AddComponent from "./component/AddComponent.jsx";
import LoginComponent from "./component/login/LoginComponent.jsx";

function App() {

    return (
        <><HeaderComponent/>
            <Routes>
                <Route path={'/login'} element={<LoginComponent/>}/>
                <Route path={"/home"} element={<HomeComponent/>}></Route>
                <Route path={"/players/:searchName?"} element={<ListComponent/>}/>
                <Route path={"/players/detail/:id"} element={<DetailComponent/>}/>
                <Route path={"/players/add"} element={<AddComponent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
