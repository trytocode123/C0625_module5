import {useEffect, useState} from "react";
import {getPigList, searchPigByName} from "../service/PigService.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate, useParams} from "react-router";
import DeletePigModalComponent from "./DeletePigModalComponent.jsx";
import {useSearchParams} from "react-router-dom";


const PigListComponent = () => {
    const [pigList, setPigList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pigDelete, setPigDelete] = useState({});
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [searchParams] = useSearchParams();
    const searchName = searchParams.get(("pigCode_like")) || "";
    const origin = searchParams.get("origin.id_like") || "";
    const handleToggleModal = (pig) => {
        setShowModal(prev => !prev);
        setPigDelete(pig);
    };

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataPig = async () => {
            // Nếu có điều kiện lọc => gọi API search
            if (searchName || origin) {
                const query = {};
                if (searchName) query.pigCode_like = searchName;
                if (origin) query["origin.id_like"] = origin; // hoặc origin.name_like

                const data = await searchPigByName(query);
                setPigList(data);
            } else {
                // không có filter => lấy toàn bộ
                const data = await getPigList();
                setPigList(data);
            }
        };
        fetchDataPig();

    }, [deleteFlag, searchName, origin])

    const handleDetail = async (id) => {
        navigate(`/pigList/detail/${id}`);
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Danh sách heo</h3>

                <Link to={"/pigList/add"} className="btn btn-primary">
                    ➕ Thêm heo
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-dark table-striped mb-0">
                        <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Mã số heo</th>
                            <th>Ngày nhập chuồng</th>
                            <th>Trọng lượng khi nhập chuồng</th>
                            <th>Ngày xuất chuồng</th>
                            <th>Trọng lượng khi xuất chuồng</th>
                            <th>Xuất xứ</th>
                            <th>Xuất chuồng</th>
                            <th colSpan={2}>Hành động</th>
                        </tr>
                        </thead>

                        <tbody>
                        {pigList.map((pig, i) => (
                            <tr key={pig.id}>
                                <td className="text-center fw-bold">{i + 1}</td>
                                <td>{pig.pigCode}</td>
                                <td>{new Date(pig.initTime).toLocaleDateString('vi-VN')}</td>
                                <td>{pig.initWeight} kg</td>
                                <td className={pig.endTime === "" ? "text-warning fw-semibold" : ""}>
                                    {pig.endTime === "" ? "Chưa đến ngày xuất" : new Date(pig.endTime).toLocaleDateString('vi-VN')}
                                </td>
                                <td>{pig.endWeight} {pig.endWeight ? "kg" : ""}</td>
                                <td>{pig.origin.name}</td>
                                <td className={pig.endTime === "" ? "text-muted" : "text-success fw-bold"}>
                                    {pig.endTime === "" ? "Bán" : "Đã bán"}
                                </td>

                                <td className="d-flex gap-2 justify-content-center">
                                    <button onClick={() => {
                                        handleToggleModal(pig)
                                    }} className="btn btn-sm btn-outline-danger">Xóa

                                    </button>
                                    <button onClick={() => {
                                        handleDetail(pig.id);
                                    }} className="btn btn-sm btn-outline-info">Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <DeletePigModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={pigDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    );
}

export default PigListComponent;
