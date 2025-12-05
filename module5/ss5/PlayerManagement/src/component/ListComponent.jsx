import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";
import {getAll, searchByName} from "../service/PlayerService.js";
import DeleteModalComponent from "./DeleteModalComponent.jsx";
import {Link} from "react-router";
import {useParams} from "react-router-dom";

const ListComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [playerDelete, setPlayerDelete] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const reloadAfterDelete = () => {
        setShowModal(prevState => !prevState);
        setDeleteFlag(prevState => !prevState);
    }
    const {searchName} = useParams();
    useEffect(() => {
        if (searchName && searchName.trim() !== "") {
            setPlayerList(searchByName(decodeURIComponent(searchName)));
        } else {
            setPlayerList(getAll());
        }

    }, [deleteFlag, searchName]);

    const handleToggleModal = (playerDelete) => {
        setShowModal(prevState => !prevState);
        setPlayerDelete(playerDelete);
    }

    return (
        <>
            <h3>Danh sách cầu thủ</h3>
            <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>
                        Mã cầu thủ
                    </th>

                    <th>
                        Tên cầu thủ
                    </th>

                    <th>
                        Ngày sinh
                    </th>

                    <th>
                        Giá trị
                    </th>

                    <th>Hành động</th>
                </tr>
                </thead>

                <tbody>
                {playerList.map(player => (
                    <tr key={player.id}>
                        <td>{player.maCauThu}</td>
                        <td>{player.ten}</td>
                        <td>{player.ngaySinh}</td>
                        <td>{player.gia.toLocaleString('vi-VN') + " đ"}</td>
                        <td>
                            <button onClick={() => handleToggleModal(player)} className={"btn btn-danger"}>Xóa</button>
                            <Link to={`/players/detail/${player.id}`} className={"btn btn-info"}>Chi tiết</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showModal && <DeleteModalComponent show={showModal}
                                                handleToggleModal={handleToggleModal}
                                                playerDelete={playerDelete}
                                                reloadAfterDelete={reloadAfterDelete}/>}
        </>
    )
}

export default ListComponent;