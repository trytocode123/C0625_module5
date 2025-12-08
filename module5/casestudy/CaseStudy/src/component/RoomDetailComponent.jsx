import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {editRoom, findRoomById} from "../service/RoomService.js";
import {Field, Form, Formik} from "formik";
import {getFreeServiceList} from "../service/FreeService.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import DeleteRoomModalComponent from "./DeleteRoomModalComponent.jsx";

const RoomDetailComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [detailRoom, setDetailRoom] = useState({
        id: 0,
        name: "",
        area: 0,
        fee: 0,
        capacity: 0,
        type: "",
        standard: "",
        description: "",
        freeService: ""
    });


    const reloadAfterDelete = () => {
        setShowModal(prev => !prev);
    };

    const [freeServiceList, setFreeServiceList] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            const detail = await findRoomById(id);
            if (detail) {
                const detailFormat = {
                    ...detail,
                    freeService: JSON.stringify(detail.freeService)
                };
                setDetailRoom(detailFormat);
            }
        };

        const fetchFreeService = async () => {
            const data = await getFreeServiceList();
            setFreeServiceList(data);
        };
        fetchDetail();
        fetchFreeService();
    }, [id]);

    const navigate = useNavigate();
    const handleToggleModal = () => {
        setShowModal(prev => !prev);
    };

    const handleEdit = async (values) => {
        const detailFormat = {...values, freeService: JSON.parse(values.freeService)}
        const isEdited = await editRoom(detailFormat);
        if (isEdited) {
            toast.success("Cập nhật thành công!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000
            });
            navigate("/rooms");
        } else {
            toast.success("Cập nhật thất bại!", {
                theme: "dark",
                closeOnClick: true,
                autoClose: 2000
            })
        }
    };

    return (
        <div
            className="py-5"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, rgba(0,123,255,0.05), rgba(40,167,69,0.03))"
            }}
        >
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="text-uppercase fw-bold mb-2">
                        Chi tiết phòng nghỉ dưỡng
                    </h2>
                    <p className="text-muted mb-0">
                        Xem và chỉnh sửa thông tin chi tiết phòng tại Furama Resort
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="card shadow border-0">

                            {/* Header */}
                            <div className="card-header bg-white border-0 pb-0">
                                <h5 className="mb-1 text-primary fw-semibold">
                                    Thông tin phòng
                                </h5>
                                <small className="text-muted">
                                    Vui lòng kiểm tra kỹ thông tin trước khi lưu thay đổi.
                                </small>
                            </div>

                            <div className="card-body">
                                <Formik
                                    initialValues={detailRoom}
                                    onSubmit={handleEdit}
                                    enableReinitialize={true}
                                >
                                    {() => (
                                        <Form>
                                            <Field type="hidden" name="id"/>

                                            <div className="row mb-3">
                                                <div className="col-md-6 mb-3 mb-md-0">
                                                    <label className="form-label fw-semibold">
                                                        Tên phòng
                                                    </label>
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập tên phòng"
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        Loại thuê
                                                    </label>
                                                    <Field
                                                        name="type"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Daily, Monthly..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6 mb-3 mb-md-0">
                                                    <label className="form-label fw-semibold">
                                                        Diện tích
                                                    </label>
                                                    <div className="input-group">
                                                        <Field
                                                            name="area"
                                                            type="number"
                                                            className="form-control"
                                                            min="0"
                                                        />
                                                        <span className="input-group-text">
                                                            m<sup>2</sup>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        Giá thuê
                                                    </label>
                                                    <div className="input-group">
                                                        <Field
                                                            name="fee"
                                                            type="number"
                                                            className="form-control"
                                                            min="0"
                                                        />
                                                        <span className="input-group-text">đ</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6 mb-3 mb-md-0">
                                                    <label className="form-label fw-semibold">
                                                        Số người tối đa
                                                    </label>
                                                    <Field
                                                        name="capacity"
                                                        type="number"
                                                        className="form-control"
                                                        min="1"
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        Tiêu chuẩn phòng
                                                    </label>
                                                    <Field
                                                        name="standard"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Standard, Deluxe..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Mô tả
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    className="form-control"
                                                    rows="3"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold">
                                                    Dịch vụ miễn phí đi kèm
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="freeService"
                                                    className="form-select"
                                                >
                                                    {freeServiceList.map((freeService) => (
                                                        <option
                                                            key={freeService.id}
                                                            value={JSON.stringify(freeService)}
                                                        >
                                                            {freeService.name} ({freeService.unit}) -
                                                            {freeService.price.toLocaleString("vi-VN")}đ
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="d-flex justify-content-end gap-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        handleToggleModal(detailRoom)
                                                    }}
                                                >
                                                    Xóa phòng
                                                </button>

                                                <Link
                                                    type="reset"
                                                    className="btn btn-outline-secondary"
                                                    to={"/rooms"}
                                                >
                                                    Quay lại
                                                </Link>

                                                <Button
                                                    type="submit"
                                                    className="btn btn-primary px-4"
                                                >
                                                    Lưu thông tin
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <DeleteRoomModalComponent
                    show={showModal}
                    handleToggleModal={handleToggleModal}
                    objectDelete={detailRoom}
                    reloadAfterDelete={reloadAfterDelete}
                />
            )}
        </div>
    );
};

export default RoomDetailComponent;
