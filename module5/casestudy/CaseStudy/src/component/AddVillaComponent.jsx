import {Field, Form, Formik} from "formik";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {addVilla} from "../service/VillaService.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AddVillaComponent = () => {
    const [villa, setVilla] = useState({
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
    const navigate = useNavigate();
    const handleAddVilla = async (values) => {
        const isAdded = await addVilla(values);
        if (isAdded) {
            toast.success("Thêm mới thành công!", {
                position: "top-right",
                theme: "colored",
                autoClose: 2000,
                closeOnClick: true
            });
            navigate("/villas");
        } else {
            toast.error("Thêm mới thất bại!", {
                position: "top-right",
                theme: "dark",
                autoClose: 2000,
                closeOnClick: true
            });
        }
    }
    return (
        <div className="container my-4">
            <h3 className="text-center text-uppercase fw-bold mb-4">
                Thêm mới Villa nghỉ dưỡng
            </h3>

            <div className="card shadow-sm">
                <div className="card-body">
                    <Formik
                        initialValues={villa}
                        onSubmit={handleAddVilla}
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
        </div>
    )
}

export default AddVillaComponent;