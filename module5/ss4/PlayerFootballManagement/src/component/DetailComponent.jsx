import {Button, Modal} from "react-bootstrap";

const DetailComponent = ({showDetailModal, detailPlayer, handleToggleDetailModal}) => {

    return (
        <Modal show={showDetailModal} onHide={handleToggleDetailModal} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                    Thông tin cầu thủ
                    <div className="mt-1 text-primary small">{detailPlayer.name}</div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">ID:</span>
                        <span>{detailPlayer.id}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">Tên cầu thủ:</span>
                        <span>{detailPlayer.name}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">Mã cầu thủ:</span>
                        <span>{detailPlayer.code}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">Ngày sinh:</span>
                        <span>{detailPlayer.dob}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">Giá trị chuyển nhượng:</span>
                        <span>{detailPlayer.value.toLocaleString('vi-VN') + " đ"}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                        <span className="fw-semibold">Vị trí:</span>
                        <span>{detailPlayer?.position || "—"}</span>
                    </li>

                </ul>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleToggleDetailModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailComponent;
