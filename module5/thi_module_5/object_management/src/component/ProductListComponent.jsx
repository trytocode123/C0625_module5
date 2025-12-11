import {useEffect, useState} from "react";
import {getProductList} from "../service/ProductService.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate} from "react-router";
// import DeleteProductModalComponent from "./DeleteProductModalComponent.jsx";
import {useSearchParams} from "react-router-dom";
import {getAllOrder, searchOrderByName} from "../service/OriginService.js";
import DeleteProductModalComponent from "./DeleteProductModalComponent.jsx";


const ProductListComponent = () => {

    const [orderList, setOrderList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productDelete, setProductDelete] = useState({});
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [searchParams] = useSearchParams();

    const handleToggleModal = (product) => {
        setShowModal(prev => !prev);
        setProductDelete(product);
    };

    const product = searchParams.get("product.id_like") || "";

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
        setDeleteFlag(prev => !prev);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataOrder = async () => {
            if (product) {
                const query = {};

                if (product) query["product.id_like"] = product;

                const data = await searchOrderByName(query);
                setOrderList(data);
            } else {


                const fetchDataOrder = async () => {
                    const data = await getAllOrder();
                    setOrderList(data);
                }
                fetchDataOrder();
            }
        };
        fetchDataOrder();

    }, [deleteFlag, product])

    const handleDetail = (id) => {
        navigate(`/productList/detail/${id}`);
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Thống kê đơn hàng</h3>

                <Link to={"/pigList/add"} className="btn btn-primary">
                    ➕ Thêm đơn hàng
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-dark table-striped mb-0">
                        <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Mã đơn hàng</th>
                            <th> Tên sản phẩm</th>
                            <th>Giá(USD)</th>
                            <th>Loại sản phẩm</th>
                            <th>Ngày mua</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th colSpan={2}>Actor</th>
                        </tr>
                        </thead>

                        <tbody>
                        {orderList.map((order, i) => (
                            <tr key={order.id}>
                                <td>{i + 1}</td>
                                <td>{order.orderCode}</td>
                                <td>{order.product.name}</td>
                                <td>{order.product.price}</td>
                                <td>{order.product.type}</td>
                                <td>{new Date(order.buyDate).toLocaleDateString('vi-VN')}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total}</td>

                                <td className="d-flex gap-2 justify-content-center">
                                    <button onClick={() => {
                                        handleToggleModal(order)
                                    }} className="btn btn-sm btn-outline-danger">Xóa

                                    </button>
                                    <button className="btn btn-sm btn-outline-info">Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <DeleteProductModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={productDelete}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    );
}

export default ProductListComponent;
