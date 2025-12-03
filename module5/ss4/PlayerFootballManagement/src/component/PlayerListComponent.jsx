import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import DeleteModalComponent from "./DeleteModalComponent.jsx";
import {useState} from "react";
import SearchByNameComponent from "./SearchByNameComponent.jsx";
import DetailComponent from "./DetailComponent.jsx";

const PlayerListComponent = ({playerList = [], setDeleteFlag, searchPlayerList}) => {
    const [showModal, setShowModal] = useState(false);
    const [playerDelete, setPlayerDelete] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailPlayer, setDetailPlayer] = useState({});

    const handleToggleModal = (playerDelete) => {
        setShowModal(prevState => !prevState);
        setPlayerDelete(playerDelete);
    }

    const reloadAfterDelete = () => {
        setShowModal(prevState => !prevState);
        setDeleteFlag();
    }

    const handleDetail = (player) => {
        setDetailPlayer(player);
        setShowDetailModal(prevState => !prevState);
    }


    return (
        <div>
            {/* Header */}
            <div
                className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 gap-3">
                <div>
                    <h3 className="mb-0">Danh sách cầu thủ</h3>
                    <small className="text-muted">Quản lý, xem và xóa cầu thủ</small>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div style={{minWidth: 220}}>
                        <SearchByNameComponent searchPlayerList={searchPlayerList}/>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm rounded-3">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover align-middle mb-0">
                            <thead className="table-light">
                            <tr>
                                <th style={{width: 60}}>STT</th>
                                <th>Mã cầu thủ</th>
                                <th>Tên cầu thủ</th>
                                <th>Ngày sinh</th>
                                <th className="text-end">Giá trị chuyển nhượng</th>
                                <th>Vị trí</th>
                                <th className="text-center" style={{width: 160}}>Hành động</th>
                            </tr>
                            </thead>

                            <tbody>
                            {playerList.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted py-4">Chưa có cầu thủ trong danh
                                        sách.
                                    </td>
                                </tr>
                            )}

                            {playerList.map((player, i) => (
                                <tr key={player.id}>
                                    <td className="text-muted">{i + 1}</td>
                                    <td className="fw-medium">{player.code}</td>
                                    <td>{player.name}</td>
                                    <td className="text-muted">{player.dob}</td>
                                    <td className="text-end">{player?.value.toLocaleString('vi-VN') + " đ"}</td>
                                    <td>{player.position}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                onClick={() => handleToggleModal(player)}
                                                className="btn btn-sm btn-outline-danger"
                                                title="Xóa"
                                            >
                                                Xóa
                                            </button>

                                            <button
                                                onClick={() => handleDetail(player)}
                                                className="btn btn-sm btn-outline-info"
                                                title="Chi tiết"
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showDetailModal && (
                <DetailComponent
                    showDetailModal={showDetailModal}
                    detailPlayer={detailPlayer}
                    handleToggleDetailModal={handleDetail}
                />
            )}
            {showModal && (
                <DeleteModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    playerDelete={playerDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    )
}

export default PlayerListComponent;
