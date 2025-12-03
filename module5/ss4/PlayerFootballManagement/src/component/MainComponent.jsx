import PlayerListComponent from "./PlayerListComponent.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useRef, useState} from "react";
import {addPlayer, getAll} from "../service/PlayerList.js";

const MainComponent = () => {
    const inputRefId = useRef(null);
    const inputRefCode = useRef(null);
    const inputRefName = useRef(null);
    const inputRefDob = useRef(null);
    const inputRefValue = useRef(null);
    const inputRefPosition = useRef(null);

    const [player, setPlayer] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

    useEffect(() => {
        setPlayerList(getAll());
    }, [player, deleteFlag]);

    const handleSearchPlayerList = (array) => {
        if (array !== undefined) setPlayerList(array);
    };

    const handleAddPlayer = () => {
        const playerAdd = {
            id: inputRefId.current.value.trim(),
            code: inputRefCode.current.value.trim(),
            name: inputRefName.current.value.trim(),
            dob: inputRefDob.current.value,
            value: inputRefValue.current.value,
            position: inputRefPosition.current.value.trim()
        };

        addPlayer(playerAdd);
        setPlayer(playerAdd);

        inputRefId.current.value = "";
        inputRefCode.current.value = "";
        inputRefName.current.value = "";
        inputRefDob.current.value = "";
        inputRefValue.current.value = "";
        inputRefPosition.current.value = "";
    };

    const handleReloadAfterDeletePlayer = () => {
        setDeleteFlag(prev => !prev);
    };

    return (
        <div className="container my-4">

            <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                    <div className="card shadow-sm rounded-3">

                        <div className="card-body pb-4">

                            <h3 className="fw-bold mb-1 text-primary">
                                Quản lý cầu thủ
                            </h3>
                            <p className="text-muted mb-3">
                                Nhập thông tin để thêm cầu thủ vào danh sách
                            </p>

                            <hr className="my-3 opacity-25"/>

                            <h5 className="fw-semibold mb-3">Thông tin cầu thủ</h5>

                            <div className="row g-3">
                                <div className="col-12 col-md-3">
                                    <input ref={inputRefId} className="form-control form-control-sm" placeholder="ID"/>
                                </div>

                                <div className="col-12 col-md-4">
                                    <input ref={inputRefCode} className="form-control form-control-sm"
                                           placeholder="Mã cầu thủ"/>
                                </div>

                                <div className="col-12 col-md-5">
                                    <input ref={inputRefName} className="form-control" placeholder="Tên cầu thủ"/>
                                </div>

                                <div className="col-6 col-md-4">
                                    <input ref={inputRefDob} type="date" className="form-control form-control-sm"/>
                                </div>

                                <div className="col-6 col-md-4">
                                    <input ref={inputRefPosition} className="form-control form-control-sm"
                                           placeholder="Vị trí"/>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="input-group input-group-sm">
                                        <input ref={inputRefValue} className="form-control" placeholder="Giá trị (số)"/>
                                        <span className="input-group-text">VND</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="btn btn-success px-4" onClick={handleAddPlayer}>
                                    Thêm cầu thủ
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="mt-4">
                        <PlayerListComponent
                            playerList={playerList}
                            setDeleteFlag={handleReloadAfterDeletePlayer}
                            searchPlayerList={handleSearchPlayerList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
