import {Button, Modal} from "react-bootstrap";
import {deletePlayer} from "../service/PlayerList.js";

const DeleteModalComponent = ({show, handleToggleModal, playerDelete, reloadAfterDelete}) => {
    const handleDeletePlayer = () => {
        deletePlayer(playerDelete.id);
        reloadAfterDelete();
    }
    return (<>
        <Modal show={show} onHide={handleToggleModal}>
            <Modal.Header closeButton>
                <Modal.Title> <span className={'text-danger fw-bold'}>Xóa cầu thủ!</span> </Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc muốn xóa <span
                className={'text-danger fw-bold'}>{playerDelete.name}</span> không?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleToggleModal}>
                    Đóng
                </Button>
                <Button variant="danger" onClick={() => {
                    handleDeletePlayer();
                }}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal></>);
}

export default DeleteModalComponent;