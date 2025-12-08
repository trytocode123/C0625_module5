import {useParams} from "react-router";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {editVilla, findVillaById} from "../service/VillaService.js";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import DeleteVillaModalComponent from "./DeleteVillaComponent.jsx";

const VillaDetailComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({
        id: 0,
        name: "",
        area: 0,
        fee: 0,
        capacity: 0,
        type: "",
        standard: "",
        description: "",
        arePool: 0,
        floor: 0
    });

    const [showModal, setShowModal] = useState(false);

    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await findVillaById(id);
            if (data) {
                setDetail(data);
            }
        }
        fetchData();

    }, []);

    const handleEdit = async (values) => {
        const isEdited = await editVilla(values);
        if (isEdited) {
            toast.success("Cập nhập Villa thành công!", {
                theme: 'colored',
                autoClose: 2000,
                closeOnClick: true
            })
            navigate('/villas');
        } else {
            toast.error("Cập nhập Villa thất bại!", {
                theme: 'dark',
                autoClose: 2000,
                closeOnClick: true
            })
        }
    }

    const handleToggleModal = () => {
        setShowModal(prev => !prev);
    };

    return (
        <div className="container my-4">
            <h3 className="text-center text-uppercase fw-bold mb-4">
                Chi tiết Villa nghỉ dưỡng
            </h3>

            <div className="card shadow-sm">
                <div className="card-body">
                    <Formik
                        initialValues={detail}
                        onSubmit={handleEdit}
                        enableReinitialize={true}
                    >
                        <Form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Tên</label>
                                <Field name="name" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Diện tích (m²)</label>
                                <Field name="area" type="number" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Giá (đ)</label>
                                <Field name="fee" type="number" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Số người tối đa</label>
                                <Field name="capacity" type="number" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Kiểu thuê</label>
                                <Field name="type" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Tiêu chuẩn</label>
                                <Field name="standard" className="form-control"/>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Mô tả</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Diện tích hồ bơi (m²)</label>
                                <Field name="arePool" type="number" className="form-control"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Số tầng</label>
                                <Field name="floor" type="number" className="form-control"/>
                            </div>

                            <div className="col-12 d-flex justify-content-between mt-4">
                                <button
                                    variant="danger"
                                    type="button"
                                    onClick={handleToggleModal}
                                    className={'btn btn-danger'}
                                >
                                    Xóa
                                </button>

                                <div>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="me-2"
                                        onClick={() => navigate('/villas')}
                                    >
                                        Quay lại
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {showModal && (
                <DeleteVillaModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={detail}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    )
}

export default VillaDetailComponent;
