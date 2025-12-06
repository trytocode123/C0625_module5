import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from "react";
import { getAll, searchByName } from "../service/PlayerService.js";
import { Link, useParams } from "react-router-dom";
import DeleteModalComponent from "./DeleteModalComponent.jsx";

const ListComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [playerDelete, setPlayerDelete] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

    const { searchName } = useParams();

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (searchName && searchName.trim() !== "") {
                const data = await searchByName(searchName);
                setPlayerList(data);
            } else {
                const data = await getAll();
                setPlayerList(data);
            }
        };
        fetchData();
    }, [deleteFlag, searchName]);

    const handleToggleModal = (player) => {
        setShowModal(prev => !prev);
        setPlayerDelete(player || {});
    };

    // Chỉ xử lý màu theo tên vị trí
    const getPositionInfo = (player) => {
        const name = player?.position?.name || "Chưa có";

        let badgeClass = "badge bg-secondary";
        const lower = name.toLowerCase();

        if (lower.includes("tiền đạo")) {
            badgeClass = "badge bg-danger";
        } else if (lower.includes("hậu vệ")) {
            badgeClass = "badge bg-success";
        } else if (lower.includes("thủ môn")) {
            badgeClass = "badge bg-primary";
        } else if (lower.includes("tiền vệ")) {
            badgeClass = "badge bg-warning text-dark";
        }

        return { name, badgeClass };
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">Danh sách cầu thủ</h3>
                    <div className="text-muted small">
                        Tổng số: <span className="fw-semibold">{playerList.length}</span> cầu thủ
                    </div>
                </div>
                <Link to="/players/add" className="btn btn-primary btn-sm">
                    + Thêm cầu thủ
                </Link>
            </div>

            <div className="d-block d-md-none">
                <div className="list-group">
                    {playerList.length === 0 && (
                        <div className="p-3 text-center text-muted small">
                            Không có cầu thủ nào.
                        </div>
                    )}

                    {playerList.map(player => {
                        const initials = (player.ten || '')
                            .trim()
                            .split(/\s+/)
                            .map(p => p[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();

                        const { name: positionName, badgeClass } = getPositionInfo(player);

                        return (
                            <div
                                key={player.id}
                                className="list-group-item list-group-item-action mb-2"
                            >
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: 48,
                                                height: 48,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {initials}
                                        </div>
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <div>
                                                <div className="fw-bold">
                                                    {player.ten}
                                                </div>
                                                <div className="mt-1 d-flex flex-wrap align-items-center gap-2">
                                                    <span className="badge bg-light text-muted border">
                                                        Mã: <span className="fw-semibold text-dark">{player.maCauThu}</span>
                                                    </span>
                                                    <span className={badgeClass}>
                                                        {positionName}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-end">
                                                <div className="fw-bold text-danger">
                                                    {(Number(player.gia) || 0).toLocaleString('vi-VN')} ₫
                                                </div>
                                                <div className="text-muted small mt-1">
                                                    NS: <span className="fw-medium">{player.ngaySinh}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 d-flex gap-2">
                                            <Link
                                                to={`/players/detail/${player.id}`}
                                                className="btn btn-sm btn-outline-info flex-fill"
                                            >
                                                Chi tiết
                                            </Link>
                                            <button
                                                onClick={() => handleToggleModal(player)}
                                                className="btn btn-sm btn-outline-danger flex-fill"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Desktop view */}
            <div className="d-none d-md-block">
                <div className="table-responsive">
                    <table className="table align-middle table-striped">
                        <thead>
                        <tr>
                            <th className="ps-4">Mã</th>
                            <th>Tên cầu thủ</th>
                            <th>Ngày sinh</th>
                            <th>Vị trí</th>
                            <th className="text-end pe-4">Giá trị</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playerList.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    Không có cầu thủ nào.
                                </td>
                            </tr>
                        )}

                        {playerList.map(player => {
                            const { name: positionName, badgeClass } = getPositionInfo(player);

                            return (
                                <tr key={player.id}>
                                    <td className="ps-4">
                                        <span className="badge bg-light text-dark border">
                                            {player.maCauThu}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="fw-bold">{player.ten}</div>
                                    </td>

                                    <td>
                                        <span className="text-muted small">
                                            {player.ngaySinh}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={badgeClass}>
                                            {positionName}
                                        </span>
                                    </td>

                                    <td className="text-end pe-4">
                                        <span className="fw-bold">
                                            {(Number(player.gia) || 0).toLocaleString('vi-VN')} ₫
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link
                                                to={`/players/detail/${player.id}`}
                                                className="btn btn-sm btn-outline-info"
                                            >
                                                Chi tiết
                                            </Link>
                                            <button
                                                onClick={() => handleToggleModal(player)}
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <DeleteModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    playerDelete={playerDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </>
    );
};

export default ListComponent;
