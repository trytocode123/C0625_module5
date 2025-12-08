import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/action.js";

const HeaderComponent = () => {
    const refSearch = useRef(null);
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleSearch = () => {
        const value = refSearch.current.value.trim();
        if (value === "") {
            navigate("/players");
        } else {
            navigate(`/players/${value}`);
        }
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-dark shadow-sm"
                style={{
                    background: "linear-gradient(90deg, #0d47a1, #1976d2)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1020
                }}
            >
                <div className="container-fluid">

                    <Link className="navbar-brand d-flex align-items-center fw-bold" to="/home">
                        <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
                            style={{
                                width: 32,
                                height: 32,
                                background: "rgba(255,255,255,0.15)",
                                fontSize: "0.9rem"
                            }}
                        >
                            ⚽
                        </span>
                        <span>Quản lý cầu thủ</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/players">
                                    Danh sách cầu thủ
                                </Link>
                            </li>
                            {!auth.account && <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>Login</Link>
                            </li>}
                            {auth.account&& <li className="nav-item">
                                <button onClick={handleLogout} className="nav-link">Logout</button>
                            </li>}
                            <li className="nav-item">
                                <span className="nav-link">{auth?.account?.username}</span>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center gap-2">
                            <div className="input-group input-group-sm">
                                <input
                                    ref={refSearch}
                                    className="form-control border-0"
                                    type="search"
                                    placeholder="Tìm kiếm cầu thủ theo tên..."
                                    aria-label="Search"
                                    style={{
                                        borderTopLeftRadius: "999px",
                                        borderBottomLeftRadius: "999px"
                                    }}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="btn btn-outline-light px-3"
                                    type="button"
                                    style={{
                                        borderTopRightRadius: "999px",
                                        borderBottomRightRadius: "999px",
                                        fontWeight: 500
                                    }}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default HeaderComponent;
