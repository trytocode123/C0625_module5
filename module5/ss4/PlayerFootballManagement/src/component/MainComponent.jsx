import PlayerListComponent from "./PlayerListComponent.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useRef, useState} from "react";
import {addPlayer, getAll} from "../service/PlayerList.js";


const MainComponent = () => {
    const [player, setPlayer] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

    const inputRefId = useRef(null);
    const inputRefCode = useRef(null);
    const inputRefName = useRef(null);
    const inputRefDob = useRef(null);
    const inputRefValue = useRef(null);
    const inputRefPosition = useRef(null);
    useEffect(() => {
        setPlayerList(getAll);
    }, [player, deleteFlag]);

    const handleSearchPlayerList = (array) => {
        if (array !== undefined) {
            setPlayerList(array);
            console.log("Đã gán lại được")
        } else {
            console.log("không gán được tham số")
        }
    }

    const handleAddPlayer = () => {
        const playerAdd = {
            id: inputRefId.current.value,
            code: inputRefCode.current.value,
            name: inputRefName.current.value,
            dob: inputRefDob.current.value,
            value: inputRefValue.current.value,
            position: inputRefPosition.current.value
        }
        setPlayer(playerAdd);
        addPlayer(playerAdd);

        inputRefId.current.value = "";
        inputRefCode.current.value = "";
        inputRefName.current.value = "";
        inputRefDob.current.value = "";
        inputRefValue.current.value = "";
        inputRefPosition.current.value = "";

    }

    const handleReloadAfterDeletePlayer = () => {
        setDeleteFlag(prevState => !prevState);
    }
    return (<div>
        <h3>Thêm cầu thủ vào danh sách</h3>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">ID: </span>
            <input ref={inputRefId} type="text" className="form-control" placeholder="ID" aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Mã cầu thủ: </span>
            <input ref={inputRefCode} type="text" className="form-control" placeholder="Nhập mã cầu thủ"
                   aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Tên cầu thủ: </span>
            <input ref={inputRefName} type="text" className="form-control" placeholder="Nhập tên cầu thủ"
                   aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Ngày sinh cầu thủ: </span>
            <input ref={inputRefDob} type="date" className="form-control" aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Giá trị chuyển nhượng: </span>
            <input ref={inputRefValue} type="text" className="form-control"
                   placeholder="Nhập ngày giá trị chuyển nhượng"
                   aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Vị trí: </span>
            <input ref={inputRefPosition} type="text" className="form-control" placeholder="Nhập vị trí"
                   aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>
        <button className={'btn btn-primary rounded-3'} onClick={handleAddPlayer} type={'button'}>Thêm</button>
        <PlayerListComponent playerList={playerList} setDeleteFlag={handleReloadAfterDeletePlayer}
                             searchPlayerList={handleSearchPlayerList}/>

    </div>)
}

export default MainComponent;