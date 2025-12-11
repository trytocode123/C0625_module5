import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import {getProductList} from "../service/ProductService.js";

const HeaderComponent = () => {
    const refInput = useRef(null);
    const refProductName = useRef(null);
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductList();
            setProductList(data);
        }
        fetchData();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const code = refInput.current.value.trim();
        const product = refProductName.current.value.trim();
        if (code) {
            params.set("pigCode_like", code);
        }
        if (product) {
            params.set("product.id_like", product);
        }
        navigate(`/productList?${params.toString()}`);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/productList"} className="nav-link active" aria-current="page">Home</Link>
                        </li>


                    </ul>

                    <form onSubmit={handleSearch} className="d-flex">
                        <select ref={refProductName}>
                            <option value={""}>--Sản phẩm--</option>
                            {productList.map(product => (
                                <option value={product.id} key={product.id}>{product.name}</option>
                            ))}
                        </select>
                        <input ref={refInput} className="form-control me-2" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent;