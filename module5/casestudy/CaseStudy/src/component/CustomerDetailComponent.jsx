import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {editCustomer, findCustomerById} from "../service/CustomerService.js";
import {useParams} from "react-router";
import {getCustomerTypeList} from "../service/CustomerTypeService.js";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";

const CustomerDetailComponent = () => {
    const [detail, setDetail] = useState({
        id: 0,
        name: "",
        birthDay: "",
        gender: "",
        idCard: "",
        phone: "",
        email: "",
        address: "",
        type: ""
    });

    const [customerTypeList, setCustomerTypeList] = useState([]);

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await findCustomerById(id);
            if (data) {
                const dataFormat = {...data, gender: data.gender ? "true" : "false", type: JSON.stringify(data.type)}
                setDetail(dataFormat);
            }
        };

        const fetchCustomerTypeData = async () => {
            const data = await getCustomerTypeList();
            setCustomerTypeList(data);
        };

        fetchCustomerTypeData();
        fetchData();
    }, [id]);

    const handleEdit = async (values) => {
        const dataFormat = {...values, gender: values.gender === "true", type: JSON.parse(values.type)}
        const isEdit = await editCustomer(dataFormat);
        if (isEdit) {
            toast.success("Cập nhật thành công!", {
                theme: "colored",
                autoClose: 2000,
                closeOnClick: true
            })
            navigate("/customers");
        } else {
            toast.error("Cập nhật thất bại!", {
                theme: "dark",
                autoClose: 2000,
                closeOnClick: true
            })
        }
    };

    return (
        <div className="bg-light py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0 text-uppercase">Chi tiết khách hàng</h4>
                            </div>

                            <div className="card-body">
                                <Formik initialValues={detail}
                                        onSubmit={handleEdit}
                                        enableReinitialize={true}>
                                    <Form>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Tên:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Nhập tên khách hàng"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Ngày sinh:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    name="birthDay"
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Giới tính:
                                            </label>
                                            <div className="col-sm-9 d-flex align-items-center">
                                                <div className="form-check me-3">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="true"
                                                        className="form-check-input"
                                                        id="genderMale"
                                                    />
                                                    <label className="form-check-label" htmlFor="genderMale">
                                                        Nam
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="false"
                                                        className="form-check-input"
                                                        id="genderFemale"
                                                    />
                                                    <label className="form-check-label" htmlFor="genderFemale">
                                                        Nữ
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                CCCD:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    name="idCard"
                                                    className="form-control"
                                                    placeholder="Nhập CCCD"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Số điện thoại:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Email:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Nhập email"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">
                                                Địa chỉ:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    as="textarea"
                                                    name="address"
                                                    className="form-control"
                                                    rows="2"
                                                    placeholder="Nhập địa chỉ"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4 row">
                                            <label className="col-sm-3 col-form-label">
                                                Loại khách:
                                            </label>
                                            <div className="col-sm-9">
                                                <Field
                                                    as="select"
                                                    name="type"
                                                    className="form-select"
                                                >
                                                    {customerTypeList.map((customerType) => (
                                                        <option
                                                            key={customerType.id}
                                                            value={JSON.stringify(customerType)}
                                                        >
                                                            {customerType.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <Link
                                                to={"/customers"}
                                                className="btn btn-outline-secondary"
                                            >
                                                Quay lại
                                            </Link>
                                            <Button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Lưu thay đổi
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailComponent;
