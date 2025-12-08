import {useEffect, useState} from "react";
import {getCustomerList, searchCustomerByName} from "../service/CustomerService.js";
import {useParams} from "react-router";
import DeleteCustomerModalComponent from "./DeleteCustomerModalComponent.jsx";
import {Link, useNavigate} from "react-router-dom";

const CustomerListComponent = () => {
    const [customerList, setCustomerList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [customerDelete, setCustomerDelete] = useState({});
    const [deleteFlag, setDeleteFlag] = useState(false);

    const {searchName} = useParams();
    const handleToggleModal = (customer) => {
        setShowModal(prev => !prev);
        setCustomerDelete(customer);
    };
    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    };
    useEffect(() => {
        if (searchName?.trim()) {
            const fetchDataSearch = async () => {
                const data = await searchCustomerByName({
                    name_like: searchName
                });
                setCustomerList(data);
            };
            fetchDataSearch();
        } else {
            const fetchData = async () => {
                const data = await getCustomerList();
                setCustomerList(data);
            };
            fetchData();
        }
    }, [deleteFlag, searchName]);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/customers/detail/${id}`);
    }


    return (
        <div className="bg-light py-4">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0 text-uppercase fw-bold">
                        Danh sách khách hàng
                    </h3>
                    <Link to={'/customers/add'} className="btn btn-primary btn-sm">
                        + Thêm khách hàng
                    </Link>
                </div>

                {customerList.length === 0 && (
                    <p className="text-center text-muted">
                        Hiện chưa có khách hàng nào.
                    </p>
                )}

                {customerList.length > 0 && (
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover mb-0 align-middle">
                                    <thead className="table-light">
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>CCCD</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Loại khách</th>
                                        <th>Địa chỉ</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {customerList.map((customer, i) => (
                                        <tr key={customer.id || i}>
                                            <td className="text-center">{i + 1}</td>
                                            <td>{customer.name}</td>
                                            <td className="text-center">{customer.birthDay}</td>
                                            <td className="text-center">
                                                {customer.gender ? "Nam" : "Nữ"}
                                            </td>
                                            <td className="text-center">{customer.idCard}</td>
                                            <td className="text-center">{customer.phone}</td>
                                            <td>{customer.email}</td>
                                            <td className="text-center">
                                                {customer.type?.name}
                                            </td>
                                            <td>{customer.address}</td>
                                            <td className="text-center">
                                                <button onClick={() => handleToggleModal(customer)}
                                                        className="btn btn-sm btn-outline-danger me-2">
                                                    Xóa
                                                </button>
                                                <button onClick={() => {
                                                    handleEdit(customer.id)
                                                }} className="btn btn-sm btn-outline-primary">
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {showModal && (
                <DeleteCustomerModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={customerDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    );
};

export default CustomerListComponent;
