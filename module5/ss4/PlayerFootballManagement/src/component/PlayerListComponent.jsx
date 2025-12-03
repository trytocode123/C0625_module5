import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import DeleteModalComponent from "./DeleteModalComponent.jsx";
import {useState} from "react";
import SearchByNameComponent from "./SearchByNameComponent.jsx";

const PlayerListComponent = ({playerList = [], setDeleteFlag, searchPlayerList}) => {
    const [showModal, setShowModal] = useState(false);
    const [playerDelete, setPlayerDelete] = useState({});

    const handleToggleModal = (playerDelete) => {
        setShowModal(prevState => !prevState);
        setPlayerDelete(playerDelete);
        console.log("ok", showModal);
    }

    const reloadAfterDelete = () => {
        setShowModal(prevState => !prevState);
        setDeleteFlag();
    }

    return (
        <div>
            <h3>Danh sách cầu thủ</h3>
            <SearchByNameComponent searchPlayerList={searchPlayerList}/>
            <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã cầu thủ</th>
                    <th>Tên cầu thủ</th>
                    <th>Ngày sinh</th>
                    <th>Giá trị chuyển nhượng</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                </tr>
                </thead>

                <tbody>
                {playerList.map((player, i) => (
                    <tr key={player.id}>
                        <td>{i + 1}</td>
                        <td>{player.code}</td>
                        <td>{player.name}</td>
                        <td>{player.dob}</td>
                        <td>{player.value}</td>
                        <td>{player.position}</td>
                        <td>
                            <button onClick={() => handleToggleModal(player)} className={'btn btn-danger'}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && <DeleteModalComponent show={showModal} handleToggleModal={handleToggleModal}
                                                playerDelete={playerDelete} reloadAfterDelete={reloadAfterDelete}/>}
        </div>
    )
}

export default PlayerListComponent;