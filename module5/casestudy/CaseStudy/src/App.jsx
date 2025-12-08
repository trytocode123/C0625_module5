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
import RoomDetailComponent from "./component/RoomDetailComponent.jsx";
import {ToastContainer} from "react-toastify";
import AddRoomComponent from "./component/AddRoomComponent.jsx";
import VillaDetailComponent from "./component/VillaDetailComponent.jsx";
import AddVillaComponent from "./component/AddVillaComponent.jsx";
import HouseDetailComponent from "./component/HouseDetailComponent.jsx";
import AddHouseComponent from "./component/AddHouseComponent.jsx";
import CustomerListComponent from "./component/CustomerListComponent.jsx";
import CustomerDetailComponent from "./component/CustomerDetailComponent.jsx";
import AddCustomerComponent from "./component/AddCustomerComponent.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={"/rooms/:searchName?"} element={<RoomListComponent/>}/>
                <Route path={"/rooms/detail/:id"} element={<RoomDetailComponent/>}/>
                <Route path={"/rooms/add"} element={<AddRoomComponent/>}/>
                <Route path={"/villas/:searchName?"} element={<VillaListComponent/>}/>
                <Route path={"/villas/detail/:id"} element={<VillaDetailComponent/>}/>
                <Route path={"/villas/add"} element={<AddVillaComponent/>}/>
                <Route path={"/houses/:searchName?"} element={<HouseListComponent/>}/>
                <Route path={"/houses/detail/:id"} element={<HouseDetailComponent/>}/>
                <Route path={"/houses/add"} element={<AddHouseComponent/>}/>
                <Route path={"/customers/:searchName?"} element={<CustomerListComponent/>}/>
                <Route path={"/customers/detail/:id"} element={<CustomerDetailComponent/>}/>
                <Route path={"/customers/add"} element={<AddCustomerComponent/>}/>
                <Route path={"/"} element={<HomeComponent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
