import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

const HeaderComponent = () => {

    const refSearch = useRef(null);
    const navigate = useNavigate();
    const handleSearch = () => {
        const value = refSearch.current.value.trim();

        if (value === "") {
            navigate("/players");
        } else {
            navigate(`/players/${encodeURIComponent(value)}`);
        }

    }
    return (
        <>
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
                                <Link className="nav-link active" aria-current="page" to={"/home"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/players"}>List</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1"
                                   aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <input ref={refSearch} className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button onClick={handleSearch} className="btn btn-outline-success"
                                    type="button">Search
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HeaderComponent;