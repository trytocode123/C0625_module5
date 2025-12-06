import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById, edit} from "../service/PlayerService.js";
import {toast} from "react-toastify";
import {getAll} from "../service/PositionService.js";

const DetailComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState({
        id: "",
        maCauThu: "",
        ten: "",
        ngaySinh: "",
        gia: "",
        position: ""
    });

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const detailPlayer = await findById(id);
            if (detailPlayer) {
                const detailPlayerFormat = {
                    ...detailPlayer,
                    position: JSON.stringify(detailPlayer.position)
                };
                setDetail(detailPlayerFormat);
            }
        };

        const fetchDataPosition = async () => {
            const position = await getAll();
            setPositions(position);
        };

        fetchDataPosition();
        fetchData();
    }, [id]);

    const handleEdit = async (values) => {
        const playerEdit = {
            ...values,
            position: JSON.parse(values.position)
        };
        const isEditSuccess = await edit(playerEdit);
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

    const initials = (detail.ten || "")
        .trim()
        .split(/\s+/)
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const formattedPrice = (Number(detail.gia) || 0).toLocaleString("vi-VN");

    return (
        <div className="container my-4 my-md-5" style={{maxWidth: 900}}>
            <div className="card border-0 shadow-lg rounded-3">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center border-0"
                    style={{
                        background: "linear-gradient(135deg, #1565c0, #1e88e5)"
                    }}
                >
                    <div>
                        <h3 className="mb-0 fw-semibold">Chi tiết cầu thủ</h3>
                        <small className="text-light-50">
                            Trang thông tin chi tiết & chỉnh sửa
                        </small>
                    </div>
                    <Link
                        to="/players"
                        className="btn btn-sm btn-outline-light"
                    >
                        ← Quay lại danh sách
                    </Link>
                </div>

                <div className="card-body p-4 p-md-5">
                    <div
                        className="d-flex flex-column flex-md-row align-items-center align-items-md-start mb-4 p-3 p-md-4 rounded-3 bg-light border"
                    >
                        <div className="me-md-3 mb-3 mb-md-0 text-center">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm bg-primary bg-opacity-10 text-primary"
                                style={{
                                    width: 80,
                                    height: 80,
                                    fontWeight: 700,
                                    fontSize: "1.6rem"
                                }}
                            >
                                {initials || "CT"}
                            </div>
                        </div>

                        <div className="flex-grow-1 w-100">
                            <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                                <div>
                                    <div className="fw-bold fs-4 mb-1 text-dark">
                                        {detail.ten || "Chưa có tên"}
                                    </div>
                                    <div className="d-flex flex-wrap align-items-center gap-2">
                                        <span className="badge bg-light text-dark border">
                                            Mã cầu thủ:&nbsp;
                                            <span className="fw-semibold">
                                                {detail.maCauThu || "N/A"}
                                            </span>
                                        </span>
                                        {detail.ngaySinh && (
                                            <span className="badge bg-light text-muted border">
                                                <span className="small me-1">
                                                    Ngày sinh:
                                                </span>
                                                <span className="fw-semibold text-info">
                                                    {detail.ngaySinh}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-md-end">
                                    <div className="text-muted small mb-1">
                                        Giá trị chuyển nhượng
                                    </div>
                                    <div
                                        className="fw-bold fs-4"
                                        style={{color: "#d32f2f"}}
                                    >
                                        {formattedPrice} ₫
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Formik
                        initialValues={detail}
                        onSubmit={handleEdit}
                        enableReinitialize={true}
                    >
                        <Form>
                            <Field type="hidden" name="id"/>

                            <h6 className="text-uppercase text-muted mb-3">
                                Thông tin chi tiết
                            </h6>

                            <div className="mb-3 mb-md-4">
                                <label className="form-label fw-semibold">
                                    Tên cầu thủ
                                </label>
                                <Field
                                    className="form-control form-control-sm"
                                    type="text"
                                    name="ten"
                                    placeholder="Nhập tên cầu thủ"
                                />
                                <div className="form-text">
                                    Đây là thông tin hiển thị chính trong danh sách.
                                </div>
                            </div>

                            <div className="mb-3 mb-md-4">
                                <label className="form-label fw-semibold">
                                    Mã cầu thủ
                                </label>
                                <Field
                                    className="form-control form-control-sm"
                                    type="text"
                                    name="maCauThu"
                                    placeholder="Ví dụ: PL004"
                                />
                                <div className="form-text">
                                    Mã định danh duy nhất cho mỗi cầu thủ.
                                </div>
                            </div>

                            <div className="mb-3 mb-md-4">
                                <label className="form-label fw-semibold">
                                    Ngày sinh
                                </label>
                                <Field
                                    className="form-control form-control-sm"
                                    type="date"
                                    name="ngaySinh"
                                />
                            </div>

                            <div className="mb-3 mb-md-4">
                                <label className="form-label fw-semibold">
                                    Giá trị (VND)
                                </label>
                                <Field
                                    className="form-control form-control-sm"
                                    type="text"
                                    name="gia"
                                    placeholder="Nhập giá trị cầu thủ"
                                />
                                <div className="form-text">
                                    Số tiền theo đơn vị Việt Nam đồng.
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Vị trí trên sân
                                </label>
                                <Field
                                    as="select"
                                    name="position"
                                    className="form-select form-select-sm"
                                >
                                    <option value="">
                                        ---- Chọn vị trí ----
                                    </option>
                                    {positions.map(position => (
                                        <option
                                            key={position.id}
                                            value={JSON.stringify(position)}
                                        >
                                            {position.name}
                                        </option>
                                    ))}
                                </Field>
                                <div className="form-text">
                                    Chọn vị trí thi đấu chính của cầu thủ.
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <Button
                                    className="px-4"
                                    variant="primary"
                                    type="submit"
                                >
                                    Lưu chỉnh sửa
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
