import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteCustomer} from "../service/CustomerService.js";

class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    handleDelete = (id) => {
        deleteCustomer(id);
        this.props.closeModal();
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa khách hàng {this.props.customer.name} không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.handleDelete(this.props.customer.id)
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteModal;