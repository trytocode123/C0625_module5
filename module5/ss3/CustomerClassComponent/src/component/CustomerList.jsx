import {Component} from "react";
import {getInfo} from "../service/CustomerService.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import DeleteModal from "./DeleteModal.jsx";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            showModal: false,
            customer: "",
        }
    }

    componentDidMount() {
        this.setState({
            customerList: [...getInfo()]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.showModal !== this.state.showModal) {
            this.setState({
                customerList: [...getInfo()]
            })
        }

    }

    handleShowModal = (customer) => {
        this.setState({
            showModal: true,
            customer: customer

        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (<>
            <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Hoạt động</th>
                </tr>
                </thead>

                <tbody>
                {this.state.customerList.map((customer, i) => (
                    <tr key={i}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button onClick={() => {
                                this.handleShowModal(customer)
                            }} className={'btn btn-danger'}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <DeleteModal customer={this.state.customer} closeModal={this.closeModal} show={this.state.showModal}/>
        </>)
    }
}

export default CustomerList;