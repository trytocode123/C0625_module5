import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import {getAllOrigin} from "../service/OriginService.js";


const HeaderComponent = () => {
    const refInput = useRef(null);
    const refOriginName = useRef(null);
    const navigate = useNavigate();
    const [originList, setOriginList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrigin();
            setOriginList(data);
        }
        fetchData();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const code = refInput.current.value.trim();
        const origin = refOriginName.current.value.trim();
        if (code) {
            params.set("pigCode_like", code);
        }
        if (origin) {
            params.set("origin.id_like", origin);
        }
        navigate(`/pigList?${params.toString()}`);
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
                            <Link to={"/pigList"} className="nav-link active" aria-current="page">Home</Link>
                        </li>


                    </ul>

                    <form onSubmit={handleSearch} className="d-flex">
                        <select ref={refOriginName}>
                            <option value={""}>--Xuất xứ--</option>
                            {originList.map(origin => (
                                <option value={origin.id} key={origin.id}>{origin.name}</option>
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