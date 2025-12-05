import {Button, Modal} from "react-bootstrap";
import {deletePlayer} from "../service/PlayerService.js";
import {toast} from "react-toastify";

const DeleteModalComponent = ({show, handleToggleModal, playerDelete, reloadAfterDelete}) => {

    const handleDeletePlayer = () => {
        deletePlayer(playerDelete.id);
        toast.success("Xóa thành công!", {
            position: "top-right",
            theme: "colored",
            autoClose: 5000,
            closeOnClick: true
        })
        reloadAfterDelete();
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
                    Bạn có chắc chắn muốn xóa cầu thủ
                    <span className="fw-bold text-danger"> {playerDelete.ten}</span>?
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-between">
                <Button variant="secondary" onClick={handleToggleModal}>
                    Đóng
                </Button>

                <Button variant="danger" className="px-4" onClick={handleDeletePlayer}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModalComponent;
