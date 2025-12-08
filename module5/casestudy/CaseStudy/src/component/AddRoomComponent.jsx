import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {addRoom} from "../service/RoomService.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {getFreeServiceList} from "../service/FreeService.js";
import {Button} from "react-bootstrap";

const AddRoomComponent = () => {
    const [room, setRoom] = useState({
        name: "",
        area: 0,
        fee: 0,
        capacity: 0,
        type: "",
        standard: "",
        description: "",
        freeService: ""
    });

    const [freeServiceList, setFreeServiceList] = useState([]);

    useEffect(() => {
        const fetchFreeService = async () => {
            const data = await getFreeServiceList();
            setFreeServiceList(data);
        };
        fetchFreeService();
    }, []);

    const navigate = useNavigate();

    const handleAddRoom = async (values) => {
        const roomFormat = {...values, freeService: JSON.parse(values.freeService)};
        const isAdded = await addRoom(roomFormat);
        if (isAdded) {
            toast.success("Thêm thành công!", {
                theme: "colored",
                autoClose: 2000,
                closeOnClick: true
            });
            navigate("/rooms");
        } else {
            toast.error("Thêm thất bại!", {
                theme: "dark",
                autoClose: 2000,
                closeOnClick: true
            });
        }
    }

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0 text-uppercase">Thêm mới Room nghỉ dưỡng</h4>
                        </div>
                        <div className="card-body">
                            <Formik initialValues={room} onSubmit={handleAddRoom}>
                                <Form>

                                    <div className="mb-3">
                                        <label className="form-label">Tên phòng</label>
                                        <Field
                                            name="name"
                                            className="form-control"
                                            placeholder="Nhập tên room"
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Diện tích (m²)</label>
                                            <Field
                                                name="area"
                                                type="number"
                                                className="form-control"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Giá thuê (đ)</label>
                                            <Field
                                                name="fee"
                                                type="number"
                                                className="form-control"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Số người tối đa</label>
                                            <Field
                                                name="capacity"
                                                type="number"
                                                className="form-control"
                                                min="1"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Kiểu thuê</label>
                                            <Field
                                                name="type"
                                                className="form-control"
                                                placeholder="VD: Theo ngày, theo giờ..."
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Tiêu chuẩn phòng</label>
                                        <Field
                                            name="standard"
                                            className="form-control"
                                            placeholder="VD: VIP, Deluxe..."
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Mô tả</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Mô tả chi tiết về room nghỉ dưỡng..."
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Dịch vụ đi kèm</label>
                                        <Field
                                            as="select"
                                            name="freeService"
                                            className="form-select"
                                        >
                                            <option value="">-- Chọn dịch vụ đi kèm --</option>
                                            {freeServiceList.map(freeService => (
                                                <option
                                                    key={freeService.id}
                                                    value={JSON.stringify(freeService)}
                                                >
                                                    {freeService.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => navigate("/rooms")}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                        >
                                            Lưu
                                        </Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomComponent;
