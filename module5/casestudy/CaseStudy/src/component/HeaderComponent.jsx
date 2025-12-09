import {Link, useLocation, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";


const HeaderComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(true);
    const handleSearch = () => {
        console.log(location.pathname)
        const page = "/" + location.pathname.split('/')[1];
        navigate(`${page}/${refSearch.current.value}`);
    }

    const refSearch = useRef(null);

    const serviceList = [
        {
            title: 'Room',
            api: '/rooms'
        },
        {
            title: 'Villa',
            api: '/villas'
        },
        {
            title: "House",
            api: '/houses'
        }
    ];
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                <Link onClick={() => {
                    setShowSearch(false);
                }} className="navbar-brand fw-bold text-uppercase" to="/">
                    Furama Resort
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Dịch vụ
                            </a>
                            <ul className="dropdown-menu">
                                {serviceList.map((service, i) => (
                                    <li onClick={() => {
                                        setShowSearch(true)
                                    }} key={i}><Link to={service.api}
                                                     className="dropdown-item">{service.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <Link onClick={() => {
                            setShowSearch(true)
                        }} to={"/customers"} className="nav-item nav-link fw-semibold" style={{cursor: "pointer"}}>
                            Quản lý khách hàng
                        </Link>

                        <Link onClick={() => {
                            setShowSearch(true)
                        }} to={"/contracts"} className="nav-item nav-link fw-semibold" style={{cursor: "pointer"}}>
                            Quản lý hợp đồng
                        </Link>
                    </ul>
                    {showSearch && location.pathname.split("/")[1] && <form className="d-flex me-3" role="search">
                        <input ref={refSearch} className="form-control me-2" type="search"
                               placeholder="Nhập để tìm kiếm..." aria-label="Search"/>
                        <button onClick={() => {
                            handleSearch()
                        }} className="btn btn-outline-primary"
                                type="button">Tìm kiếm
                        </button>
                    </form>}
                </div>
            </div>
        </nav>
    );
};

export default HeaderComponent;
