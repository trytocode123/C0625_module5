import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {editPig, findPigById} from "../service/PigService.js";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router";
import {getAllOrigin} from "../service/OriginService.js";

const UpdatePigComponent = () => {
    const [detail, setDetail] = useState({
        id: 0,
        pigCode: "",
        initTime: "",
        initWeight: 0,
        endTime: "",
        endWeight: 0,
        origin: ""
    });

    const [originList, setOriginList] = useState([]);

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataOrigin = async () => {
            const data = await getAllOrigin();
            setOriginList(data);
        };
        fetchDataOrigin();
        const fetchData = async () => {
            const detail = await findPigById(id);
            if (detail) {
                const dataFormat = {...detail, origin: JSON.stringify(detail.origin)}
                setDetail(dataFormat);
            }
        }
        fetchData();
    }, []);

    const handleUpdate = async (values) => {
        const dataFormat = {
            ...values,
            origin: JSON.parse(values.origin),
            endWeight: values.endTime === "" ? values.initWeight : values.endWeight
        }
        const isUpdated = await editPig(dataFormat);
        if (isUpdated) {
            toast.success("Cập nhật heo thành công!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
            navigate("/pigList");
        } else {
            toast.success("Cập nhật heo thất bại!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-7 w-100">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0 text-center">Thêm mới heo</h5>
                        </div>

                        <div className="card-body">
                            <Formik initialValues={detail} onSubmit={handleUpdate} enableReinitialize={true}>
                                {() => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="pigCode" className="form-label">
                                                Mã heo
                                            </label>
                                            <Field
                                                id="pigCode"
                                                name="pigCode"
                                                className="form-control"
                                                placeholder="VD: H001"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="initTime" className="form-label">
                                                Ngày nhập
                                            </label>
                                            <Field
                                                id="initTime"
                                                name="initTime"
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="initWeight" className="form-label">
                                                Trọng lượng khi nhập chuồng (kg)
                                            </label>
                                            <Field
                                                id="initWeight"
                                                name="initWeight"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="endTime" className="form-label">
                                                Ngày xuất
                                            </label>
                                            <Field
                                                id="endTime"
                                                name="endTime"
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="endWeight" className="form-label">
                                                Trọng lượng khi xuất chuồng (kg)
                                            </label>
                                            <Field
                                                id="endWeight"
                                                name="endWeight"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="origin" className="form-label">
                                                Xuất xứ
                                            </label>
                                            <Field
                                                as="select"
                                                id="origin"
                                                name="origin"
                                                className="form-select"
                                            >
                                                <option value="">-- Chọn xuất xứ --</option>
                                                {originList.map((origin) => (
                                                    <option key={origin.id} value={JSON.stringify(origin)}>
                                                        {origin.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <button type="reset" className="btn btn-outline-secondary">
                                                Hủy
                                            </button>
                                            <Button type="submit" className="btn btn-primary">
                                                Lưu
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
    )
}

export default UpdatePigComponent;