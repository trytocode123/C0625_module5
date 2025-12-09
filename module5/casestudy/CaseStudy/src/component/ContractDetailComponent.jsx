import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import {editContract, findContractById} from "../service/ContractService.js";
import {getCustomerList} from "../service/CustomerService.js";
import {getVillaList} from "../service/VillaService.js";
import {getHouseList} from "../service/HouseService.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {toast} from "react-toastify";

const ContractDetailComponent = () => {
    const [detail, setDetail] = useState({
        id: 0,
        numberContract: 0,
        startDate: "",
        endDate: "",
        preorderMoney: 0,
        totalPay: 0,
        service: "",
        customer: ""
    });

    const [customerList, setCustomerList] = useState([]);
    const [allFacilities, setAllFacilities] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await findContractById(id);
            if (data) {
                const dataFormat = {
                    ...data,
                    service: JSON.stringify(data.service),
                    customer: JSON.stringify(data.customer)
                };
                setDetail(dataFormat);
            }
        };
        fetchData();

        const fetchCustomerList = async () => {
            const data = await getCustomerList();
            setCustomerList(data);
        };
        fetchCustomerList();

        const fetchVillaList = async () => {
            const data = await getVillaList();

            setAllFacilities([...data]);
        };
        fetchVillaList();

        const fetchHouseList = async () => {
            const data = await getHouseList();

            setAllFacilities(prevState => [...prevState, ...data]);
        };
        fetchHouseList();
    }, []);


    const handleEdit = (values) => {
        const dataFormat = {...values, customer: JSON.parse(values.customer), service: JSON.parse(values.service)};
        const fetchData = async () => {
            const isEdited = await editContract(dataFormat);
            if (isEdited) {
                toast.success("Cập nhật hợp đồng thành công!", {
                    theme: 'colored',
                    autoClose: 2000,
                    closeOnClick: true
                })
                navigate("/contracts");
            } else {
                toast.error("Cập nhật hợp đồng thất bại!", {
                    theme: 'colored',
                    autoClose: 2000,
                    closeOnClick: true
                })
            }
        }
        fetchData();
        console.log(values);
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Chi tiết hợp đồng</h3>
                            <span className="badge bg-primary">
                                Mã: {detail.numberContract || "--"}
                            </span>
                        </div>

                        <div className="card-body">
                            <Formik
                                initialValues={detail}
                                onSubmit={handleEdit}
                                enableReinitialize={true}
                            >
                                <Form>
                                    <Field type="hidden" name="id"/>

                                    <div className="row">
                                        {/* Cột trái */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Số hợp đồng
                                                </label>
                                                <Field
                                                    name="numberContract"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Ngày bắt đầu
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="startDate"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Ngày kết thúc
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="endDate"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        {/* Cột phải */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Tiền đặt cọc
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        name="preorderMoney"
                                                        className="form-control text-end"
                                                    />
                                                    <span className="input-group-text">
                                                        đ
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-danger">
                                                    Tổng thanh toán
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        name="totalPay"
                                                        className="form-control text-end fw-semibold"
                                                    />
                                                    <span className="input-group-text">
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-3"/>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Khách hàng
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="customer"
                                                    className="form-select"
                                                >
                                                    <option value="">-- Chọn khách hàng --</option>
                                                    {customerList.map(customer => (
                                                        <option
                                                            key={customer.id}
                                                            value={JSON.stringify(customer)}
                                                        >
                                                            {customer.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Dịch vụ
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="service"
                                                    className="form-select"
                                                >
                                                    <option value="">-- Chọn dịch vụ --</option>
                                                    {allFacilities.map((allFacility, i) => (
                                                        <option
                                                            key={i}
                                                            value={JSON.stringify(allFacility)}
                                                        >
                                                            {allFacility.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate(-1)}
                                        >
                                            Quay lại
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetailComponent;
