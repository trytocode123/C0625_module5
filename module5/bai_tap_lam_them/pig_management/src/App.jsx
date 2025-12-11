import './App.css'
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import PigListComponent from "./component/PigListComponent.jsx";
import AddPigComponent from "./component/AddPigComponent.jsx";
import HeaderComponent from "./component/HeaderComponent.jsx";
import {ToastContainer} from "react-toastify";
import UpdatePigComponent from "./component/UpdatePigComponent.jsx";


function App() {
    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={"/pigList"} element={<PigListComponent/>}></Route>
                <Route path={"/pigList/add"} element={<AddPigComponent/>}/>
                <Route path={"/pigList/detail/:id"} element={<UpdatePigComponent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
