import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {deleteVilla} from "../service/VillaService.js";
import {deleteHouse} from "../service/HouseService.js";


const DeleteHouseModalComponent = ({show, handleToggleModal, objectDelete, reloadAfterDelete}) => {
    const navigate = useNavigate();
    const handleDeleteHouse = () => {
        const fetchData = async () => {
            const isDeleteSucceed = await deleteHouse(objectDelete?.id);
            if (isDeleteSucceed) {
                toast.success("Xóa thành công!", {
                    position: "top-right",
                    theme: "colored",
                    autoClose: 3000,
                    closeOnClick: true
                });
                navigate("/houses");
            } else {
                toast.error("Xóa không thành công!", {
                    position: "top-right",
                    theme: "dark",
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
                    Bạn có chắc chắn muốn xóa
                    <span className="fw-bold text-danger"> {objectDelete?.name}</span>?
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-between">
                <Button variant="secondary" onClick={handleToggleModal}>
                    Đóng
                </Button>

                <Button variant="danger" className="px-4" onClick={handleDeleteHouse}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteHouseModalComponent;
