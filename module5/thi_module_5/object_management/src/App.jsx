import './App.css'
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import ProductListComponent from "./component/ProductListComponent.jsx";
// import AddProductComponent from "./component/AddProductComponent.jsx";
import HeaderComponent from "./component/HeaderComponent.jsx";
import {ToastContainer} from "react-toastify";
import UpdatePigComponent from "./component/UpdatePigComponent.jsx";
import AddProductComponent from "./component/AddProductComponent.jsx";



function App() {
    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={"/productList"} element={<ProductListComponent/>}></Route>
                <Route path={"/pigList/add"} element={<AddProductComponent/>}/>
                <Route path={"/productList/detail/:id"} element={<UpdatePigComponent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
