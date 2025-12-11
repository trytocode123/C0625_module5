import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {deletePig} from "../service/PigService.js";


const DeletePigModalComponent = ({show, handleToggleModal, objectDelete, reloadAfterDelete}) => {
    const navigate = useNavigate();
    const handleDeleteCustomer = () => {
        const fetchData = async () => {
            const isDeleteSucceed = await deletePig(objectDelete?.id);
            if (isDeleteSucceed) {
                toast.success("Xóa heo thành công!", {
                    position: "top-right",
                    theme: "colored",
                    autoClose: 3000,
                    closeOnClick: true
                });
                navigate("/pigList");
            } else {
                toast.error("Xóa heo không thành công!", {
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
                    <span className="fw-bold text-danger"> {objectDelete?.pigCode}</span>?
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-between">
                <Button variant="secondary" onClick={handleToggleModal}>
                    Đóng
                </Button>

                <Button variant="danger" className="px-4" onClick={handleDeleteCustomer}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletePigModalComponent;
