import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {deleteOrder} from "../service/OriginService.js";


const DeleteProductModalComponent = ({show, handleToggleModal, objectDelete, reloadAfterDelete}) => {
    const navigate = useNavigate();
    const handleDeleteProduct = () => {
        const fetchData = async () => {
            const isDeleteSucceed = await deleteOrder(objectDelete?.id);
            if (isDeleteSucceed) {
                toast.success("Xóa đơn hàng thành công!", {
                    position: "top-right",
                    theme: "colored",
                    autoClose: 3000,
                    closeOnClick: true
                });
                navigate("/productList");
            } else {
                toast.error("Xóa đơn hàng không thành công!", {
                    position: "top-right",
                    theme: "colored",
                    autoClose: 3000,
                    closeOnClick: true
                })
            }
            reloadAfterDelete();
        }
        fetchData();
    };

    return (
        <Modal show={show} onHide={handleToggleModal} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold text-danger d-flex align-items-center gap-2">
                    ❗ Xác nhận xóa
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-0">
                <div className="alert alert-light border rounded-3 shadow-sm">
                    Bạn có chắc chắn muốn xóa heo mã số
                    <span className="fw-bold text-danger"> {objectDelete?.orderCode}</span>?
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-between">
                <Button variant="secondary" onClick={handleToggleModal}>
                    Đóng
                </Button>

                <Button variant="danger" className="px-4" onClick={handleDeleteProduct}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProductModalComponent;
