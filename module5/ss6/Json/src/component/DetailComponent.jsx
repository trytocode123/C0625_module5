import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById, edit} from "../service/PlayerService.js";
import {toast} from "react-toastify";

const DetailComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState({
        id: "",
        maCauThu: "",
        ten: "",
        ngaySinh: "",
        gia: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const detailPlayer = await findById(id);
            if (detailPlayer) {
                setDetail(detailPlayer);
            }
        };
        fetchData();
    }, [id]);

    const handleEdit = async (values) => {
        const isEditSuccess = await edit(values);
        if (isEditSuccess) {
            toast.success("Chỉnh sửa thành công!", {
                theme: "colored",
                autoClose: 3000,
                closeOnClick: true,
                position: "top-right"
            });
            navigate("/players");
        } else {
            toast.error("Chỉnh sửa thất bại!", {
                theme: "dark",
                autoClose: 3000,
                closeOnClick: true,
                position: "top-right"
            });
        }

    };

    return (
        <div className="container mt-4">

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Chi tiết cầu thủ</h3>
                </div>

                <div className="card-body">

                    <Formik
                        initialValues={detail}
                        onSubmit={handleEdit}
                        enableReinitialize={true}
                    >
                        <Form>

                            <Field type="hidden" name="id"/>

                            {/* Tên */}
                            <div className="input-group mb-3">
                                <label className="input-group-text w-25">Tên</label>
                                <Field className="form-control" type="text" name="ten"/>
                            </div>

                            {/* Mã cầu thủ */}
                            <div className="input-group mb-3">
                                <label className="input-group-text w-25">Mã cầu thủ</label>
                                <Field className="form-control" type="text" name="maCauThu"/>
                            </div>

                            {/* Ngày sinh */}
                            <div className="input-group mb-3">
                                <label className="input-group-text w-25">Ngày sinh</label>
                                <Field className="form-control" type="date" name="ngaySinh"/>
                            </div>

                            {/* Giá trị */}
                            <div className="input-group mb-4">
                                <label className="input-group-text w-25">Giá trị</label>
                                <Field className="form-control" type="text" name="gia"/>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-secondary" to="/players">
                                    Đóng
                                </Link>

                                <Button className="btn btn-primary" type="submit">
                                    Chỉnh sửa
                                </Button>
                            </div>

                        </Form>
                    </Formik>

                </div>
            </div>

        </div>
    );
};

export default DetailComponent;
