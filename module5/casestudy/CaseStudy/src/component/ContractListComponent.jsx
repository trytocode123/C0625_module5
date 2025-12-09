import {useEffect, useState} from "react";
import {getContractList, searchContractByName} from "../service/ContractService.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useNavigate} from "react-router-dom";
import DeleteContractModalComponent from "./DeleteContractModalComponent.jsx";
import {useParams} from "react-router";

const ContractListComponent = () => {
    const [contractList, setContractList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [contractDelete, setContractDelete] = useState({});
    const [deleteFlag, setDeleteFlag] = useState(false);
    const {searchName} = useParams();

    const navigate = useNavigate();

    const handleToggleModal = (contract) => {
        setShowModal(prev => !prev);
        setContractDelete(contract);
    };

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    };

    useEffect(() => {
        if (searchName?.trim()) {
            const fetchData = async () => {
                const data = await searchContractByName({
                    numberContract_like: searchName
                });
                setContractList(data);
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const data = await getContractList();
                setContractList(data);
            };
            fetchData();
        }
    }, [deleteFlag, searchName]);

    const handleDetail = (id) => {
        navigate(`/contracts/detail/${id}`);
    };

    const handleAddContract = () => {
        navigate("/contracts/add");  
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Danh sách hợp đồng</h3>
                <button
                    className="btn btn-primary"
                    onClick={handleAddContract}
                >
                    ➕ Thêm hợp đồng
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {contractList.length === 0 ? (
                        <p className="text-center mb-0 text-muted">
                            Không có hợp đồng nào.
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered align-middle mb-0">
                                <thead className="table-light">
                                <tr className="text-center">
                                    <th>Số hợp đồng</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Tiền đặt cọc</th>
                                    <th>Tổng thanh toán</th>
                                    <th>Dịch vụ</th>
                                    <th>Khách hàng</th>
                                    <th style={{width: '160px'}}>Hành động</th>
                                </tr>
                                </thead>

                                <tbody>
                                {contractList.map(contract => (
                                    <tr key={contract.id || contract.numberContract}>
                                        <td className="text-center">{contract.numberContract}</td>
                                        <td className="text-center">{contract.startDate}</td>
                                        <td className="text-center">{contract.endDate}</td>
                                        <td className="text-end">
                                            {contract.preorderMoney.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="text-end">
                                            {contract.totalPay.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td>{contract.service.name}</td>
                                        <td>{contract.customer.name}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleToggleModal(contract)}
                                                className="btn btn-sm btn-outline-danger me-2"
                                            >
                                                Xóa
                                            </button>

                                            <button
                                                onClick={() => handleDetail(contract.id)}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <DeleteContractModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={contractDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    );
};

export default ContractListComponent;
