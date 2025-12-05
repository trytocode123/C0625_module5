import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";
import {getAll, searchByName} from "../service/PlayerService.js";
import {Link, useParams} from "react-router";
import DeleteModalComponent from "./DeleteModalComponent.jsx";

const ListComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [playerDelete, setPlayerDelete] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    }

    const {searchName} = useParams();

    useEffect(() => {
        if (searchName && searchName.trim() !== "") {
            const ferchDataSearch = async () => {
                const data = await searchByName(searchName);
                if (data) setPlayerList(data);
                else setPlayerList([]);
            }
            ferchDataSearch();
        } else {
            const fetchData = async () => {
                const data = await getAll();
                setPlayerList(data || []);
            }
            fetchData();
        }
    }, [deleteFlag, searchName]);

    const handleToggleModal = (player) => {
        setShowModal(prev => !prev);
        setPlayerDelete(player);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="mb-0">Danh sách cầu thủ</h3>
                <Link to="/players/add" className="btn btn-primary btn-sm">Thêm cầu thủ</Link>
            </div>

            {/* Responsive list: cards on small screens, table on md+ */}
            <div className="d-block d-md-none">
                {/* Mobile: card list */}
                <div className="list-group">
                    {playerList.length === 0 && (
                        <div className="p-4 text-center text-muted small">Không có cầu thủ nào.</div>
                    )}
                    {playerList.map(player => (
                        <div key={player.id} className="list-group-item list-group-item-action mb-2 rounded shadow-sm">
                            <div className="d-flex align-items-center">
                                {/* avatar circle */}
                                <div className="flex-shrink-0 me-3">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                         style={{width:56, height:56, background:"#eef7fb", color:"#1f6f8b", fontWeight:700}}>
                                        { (player.ten || '').trim().split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase() }
                                    </div>
                                </div>

                                {/* main info */}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="fw-semibold">{player.ten}</div>
                                            <div className="text-muted small">Mã: <span className="fw-medium">{player.maCauThu}</span></div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-semibold">{(Number(player.gia) || 0).toLocaleString('vi-VN')} ₫</div>
                                            <div className="text-muted small">{player.ngaySinh}</div>
                                        </div>
                                    </div>

                                    {/* actions */}
                                    <div className="mt-3 d-flex gap-2">
                                        <Link to={`/players/detail/${player.id}`} className="btn btn-sm btn-outline-info">Chi tiết</Link>
                                        <button onClick={() => handleToggleModal(player)} className="btn btn-sm btn-outline-danger">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="d-none d-md-block">
                {/* Desktop / Tablet: pleasant table with spacing */}
                <div className="table-responsive">
                    <table className="table align-middle table-borderless bg-white rounded shadow-sm">
                        <thead>
                        <tr className="border-bottom">
                            <th className="ps-4">Mã cầu thủ</th>
                            <th>Tên cầu thủ</th>
                            <th>Ngày sinh</th>
                            <th className="text-end pe-4">Giá trị</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playerList.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-4">Không có cầu thủ nào.</td>
                            </tr>
                        )}
                        {playerList.map(player => (
                            <tr key={player.id} className="align-middle">
                                <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                             style={{width:46, height:46, background:"#eef7fb", color:"#1f6f8b", fontWeight:700}}>
                                            { (player.ten || '').trim().split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase() }
                                        </div>
                                        <div>
                                            <div className="fw-medium">{player.maCauThu}</div>
                                            <div className="text-muted small">ID: {player.id}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="fw-semibold">{player.ten}</div>
                                </td>

                                <td>{player.ngaySinh}</td>

                                <td className="text-end pe-4">{(Number(player.gia) || 0).toLocaleString('vi-VN')} ₫</td>

                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link to={`/players/detail/${player.id}`} className="btn btn-sm btn-outline-info">Chi tiết</Link>
                                        <button onClick={() => handleToggleModal(player)} className="btn btn-sm btn-outline-danger">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
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
    )
}

export default ListComponent;
