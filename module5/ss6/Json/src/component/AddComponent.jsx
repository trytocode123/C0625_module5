import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {add} from "../service/PlayerService.js";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {getAll} from "../Service/PositionService.js";
import {useEffect, useState} from "react";

const AddComponent = () => {
    const navigate = useNavigate();
    const [positions, setPosition] = useState([]);

    const initialValue = {
        maCauThu: "",
        ten: "",
        ngaySinh: "",
        gia: "",
        position: ""
    };

    const validationSchema = Yup.object({
        maCauThu: Yup.string().matches(/^PL([0-9]){3}$/, "Sai định dạng (VD: PL001)")
            .required("Yêu cầu nhập mã cầu thủ"),
        ten: Yup.string().required("Yêu cầu nhập tên").matches(/^([A-Z][a-z]+)(\s[A-z][a-z])*$/, "Tên không đúng định dạng"),
        ngaySinh: Yup.date().required("Yêu cầu nhập ngày sinh"),
        gia: Yup.number().required("Yêu cầu nhập giá").min(2000000, "Giá phải trên 2.000.000"),
        position: Yup.string().required("Yêu cầu chọn vị trí")
    });

    const handleAdd = (values) => {
        const newPlayer = {
            ...values,
            gia: Number(values.gia),
            position: {...JSON.parse(values.position), id: Number(JSON.parse(values.position).id)}
        };

        const fetchData = async () => {
            const isAddPlayer = await add(newPlayer);
            console.log(newPlayer)
            if (isAddPlayer) {
                toast.success("Thêm mới thành công!", {theme: "colored", autoClose: 3000});
                navigate("/players");
            } else {
                toast.error("Thêm mới thất bại!", {theme: "dark", autoClose: 3000});
            }
        };
        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
            const positionData = await getAll();
            setPosition(positionData);
        };
        fetchData();
    }, []);

    const computeInitials = (name) => {
        if (!name) return "PT";
        const parts = name.trim().split(/\s+/);
        const first = parts[0] ? parts[0][0] : "";
        const last = parts.length > 1
            ? parts[parts.length - 1][0]
            : (parts[0] ? parts[0][1] || "" : "");
        return (first + last).toUpperCase();
    };

    return (
        <div className="min-vh-100 d-flex align-items-center bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className="card-body p-4 p-md-5">
                                <div
                                    className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                    <div>
                                        <h4 className="fw-semibold mb-1">Thêm cầu thủ mới</h4>
                                        <p className="text-muted small mb-0">
                                            Điền thông tin chi tiết để thêm cầu thủ vào danh sách quản lý.
                                        </p>
                                    </div>
                                    <Link
                                        to="/players"
                                        className="text-decoration-none small text-primary fw-semibold"
                                    >
                                        ← Quay lại danh sách
                                    </Link>
                                </div>

                                <Formik
                                    initialValues={initialValue}
                                    validationSchema={validationSchema}
                                    enableReinitialize={true}
                                    onSubmit={handleAdd}
                                >
                                    {({values, isSubmitting}) => (
                                        <Form>
                                            <div className="row g-4">
                                                <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                                                    <div
                                                        className="rounded-circle d-flex justify-content-center align-items-center mb-3 border"
                                                        style={{
                                                            width: 110,
                                                            height: 110,
                                                            background: "#eef7fb",
                                                            color: "#1f6f8b",
                                                            fontSize: 32,
                                                            fontWeight: 700
                                                        }}
                                                        aria-hidden
                                                    >
                                                        {computeInitials(values.ten)}
                                                    </div>

                                                    <h6 className="mb-0 text-center">
                                                        {values.ten || "Tên cầu thủ"}
                                                    </h6>
                                                    <small className="text-muted">
                                                        Mã: {values.maCauThu || "-"}
                                                    </small>
                                                </div>

                                                <div className="col-12 col-md-8">
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label small fw-semibold">
                                                                Họ và tên <span className="text-danger">*</span>
                                                            </label>
                                                            <Field
                                                                name="ten"
                                                                className="form-control form-control-lg"
                                                                placeholder="Nhập họ và tên đầy đủ..."
                                                            />
                                                            <ErrorMessage
                                                                name="ten"
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-sm-6">
                                                            <label className="form-label small fw-semibold">
                                                                Mã cầu thủ <span className="text-danger">*</span>
                                                            </label>
                                                            <Field
                                                                name="maCauThu"
                                                                className="form-control"
                                                                placeholder="VD: PL005"
                                                                autoComplete="off"
                                                            />
                                                            <ErrorMessage
                                                                name="maCauThu"
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-sm-6">
                                                            <label className="form-label small fw-semibold">
                                                                Ngày sinh <span className="text-danger">*</span>
                                                            </label>
                                                            <Field
                                                                name="ngaySinh"
                                                                type="date"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="ngaySinh"
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-sm-6">
                                                            <label className="form-label small fw-semibold">
                                                                Giá trị (VND) <span className="text-danger">*</span>
                                                            </label>
                                                            <div className="input-group">
                                                                <Field
                                                                    name="gia"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Ví dụ: 190000000"
                                                                    aria-label="Gia tri"
                                                                />
                                                                <span className="input-group-text">VND</span>
                                                            </div>
                                                            <ErrorMessage
                                                                name="gia"
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-sm-6">
                                                            <label className="form-label small fw-semibold">
                                                                Vị trí thi đấu <span className="text-danger">*</span>
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                name="position"
                                                                className="form-select"
                                                            >
                                                                <option value="">---- Chọn vị trí ---</option>
                                                                {positions && positions.map(position => (
                                                                    <option
                                                                        value={JSON.stringify(position)}
                                                                        key={position.id}
                                                                    >
                                                                        {position.name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="position"
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>

                                                        <div className="col-12 mt-3">
                                                            <div className="d-flex gap-2 justify-content-end">
                                                                <Button
                                                                    type="submit"
                                                                    className="btn btn-primary px-4"
                                                                    disabled={isSubmitting}
                                                                >
                                                                    {isSubmitting ? "Đang lưu..." : "Thêm mới"}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddComponent;
