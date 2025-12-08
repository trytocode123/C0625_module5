import React, {useRef} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router";

import {login} from "../../service/userService.js";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../redux/action.js";

function LoginComponent() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch()
    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        // fetData
        const fetData = async () => {
            let loginUser = await login(username, password);
            if (loginUser) {
                dispatch(loginSuccess(loginUser));
                toast.success("Đăng nhập thành công");
                navigate("/products")
            } else {
                toast.error("Đăng nhập thất bại");
            }
        }
        fetData();


    }
    return (
        <form className={'w-25 p-3 mt-5'} style={{marginLeft: "400px", backgroundColor: 'lightgray'}}>
            <h3>Login</h3>

            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="m-1 col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input ref={usernameRef} name={'username'} className="form-control" id="inputName"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className=" m-1 col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input ref={passwordRef} name={'password'} type="password" className="form-control"
                           id="inputPassword"/>
                </div>
            </div>

            <div className="mb-3 row justify-content-center">
                <button className="col-sm-3 btn btn-success" onClick={handleLogin} type={'button'}>Login
                </button>
            </div>
        </form>
    )
}

export default LoginComponent;